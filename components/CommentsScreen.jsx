import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { db } from "../firebaseConfig";
import { Button } from "react-native-elements";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  increment,
  deleteDoc,
} from "firebase/firestore";

const CommentsScreen = ({ isModalVisible, setIsModalVisible }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const flatListRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "comments"), (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsData);
      setIsLoading(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });

    return () => unsubscribe();
  }, []);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        await addDoc(collection(db, "comments"), {
          text: newComment,
          likes: 0,
          replies: [],
          user: "Kullanıcı Adı",
          profileImage: "https://i.pinimg.com/736x/03/92/e1/0392e183349301cb9bc7e9752c6a4723.jpg",
          timestamp: new Date(),
        });
        setNewComment("");
        Keyboard.dismiss();
      } catch (error) {
        Alert.alert("Hata", "Yorum eklenirken bir hata oluştu.");
      }
    }
  };

  const handleAddReply = async (commentId) => {
    if (replyText.trim()) {
      try {
        const commentRef = doc(db, "comments", commentId);
        await updateDoc(commentRef, {
          replies: arrayUnion({
            text: replyText,
            user: "Kullanıcı Adı",
            profileImage: "https://i.pinimg.com/736x/03/92/e1/0392e183349301cb9bc7e9752c6a4723.jpg",
            timestamp: new Date(),
          }),
        });
        setReplyText("");
        setIsReplyModalVisible(false);
        setSelectedCommentId(null);
        Keyboard.dismiss();
      } catch (error) {
        Alert.alert("Hata", "Cevap eklenirken bir hata oluştu.");
      }
    }
  };

  const handleLike = async (commentId) => {
    try {
      const commentRef = doc(db, "comments", commentId);
      await updateDoc(commentRef, {
        likes: increment(1),
      });
    } catch (error) {
      Alert.alert("Hata", "Beğeni işlemi sırasında bir hata oluştu.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteDoc(doc(db, "comments", commentId));
      Alert.alert("Başarılı", "Yorum başarıyla silindi.");
    } catch (error) {
      Alert.alert("Hata", "Yorum silinirken bir hata oluştu.");
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
  };

  const renderComment = ({ item }) => {
    const timestamp = item.timestamp ? item.timestamp.toDate() : null;

    return (
      <Animated.View style={[styles.commentContainer, { opacity: fadeAnim }]}>
        <View style={styles.commentHeader}>
          <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
          <View style={styles.commentInfo}>
            <Text style={styles.userName}>{item.user}</Text>
            {timestamp && (
              <Text style={styles.timestamp}>
                {formatTimeAgo(timestamp)}
              </Text>
            )}
          </View>
        </View>
        <Text style={styles.commentText}>{item.text}</Text>
        <View style={styles.commentActions}>
          <TouchableOpacity onPress={() => handleLike(item.id)}>
            <Text style={styles.likeText}>
              <AntDesign name="like2" size={20} color="black" /> {item.likes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setSelectedCommentId(item.id); setIsReplyModalVisible(true); }} style={styles.replyButton1}>
            <MaterialCommunityIcons name="comment-text-outline" size={20} color="black" />
            <Text style={styles.replyText}>{item.replies.length} </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteComment(item.id)}>
            <Text style={styles.deleteText}>Sil</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  const renderReplyModal = () => {
    const selectedComment = comments.find(comment => comment.id === selectedCommentId);

    return (
      <Modal
        isVisible={isReplyModalVisible}
        style={styles.modalStyle}
        onBackdropPress={() => setIsReplyModalVisible(false)}
        onSwipeComplete={() => setIsReplyModalVisible(false)}
        backdropOpacity={0.7}
        backdropTransitionOutTiming={500}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        useNativeDriver={true}
        useNativeDriverForBackdrop={true}
        avoidKeyboard
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={styles.modalContent2}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.inputContainer}>
              <Text style={styles.titleText}>Cavablar</Text>
              <TouchableOpacity onPress={() => setIsReplyModalVisible(false)} style={{ marginEnd: 6 }}>
                <FontAwesome name="close" size={22} color="black" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.replyListContainer}>
              {selectedComment?.replies.map((reply, index) => {
                const replyTimestamp = reply.timestamp ? reply.timestamp.toDate() : null;

                return (
                  <View key={index} style={styles.replyContainer}>
                    <Image source={{ uri: reply.profileImage }} style={styles.replyProfileImage} />
                    <View style={styles.replyTextContainer}>
                      <Text style={styles.replyUser}>{reply.user}</Text>
                      <Text style={styles.replyText}>{reply.text}</Text>
                      {replyTimestamp && (
                        <Text style={styles.timestamp}>
                          {formatTimeAgo(replyTimestamp)}
                        </Text>
                      )}
                    </View>
                  </View>
                );
              })}
            </ScrollView>

            <View style={styles.replyInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Cavab yazın..."
                value={replyText}
                onChangeText={setReplyText}
                onSubmitEditing={() => handleAddReply(selectedCommentId)}
                blurOnSubmit={false}
              />
              <Button title="Göndər" onPress={() => handleAddReply(selectedCommentId)} />
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <Modal
      isVisible={isModalVisible}
      style={styles.modalStyle}
      onBackdropPress={() => setIsModalVisible(false)}
      onSwipeComplete={() => setIsModalVisible(false)}
      backdropOpacity={0.7}
      backdropTransitionOutTiming={500}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      avoidKeyboard
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.modalContent}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.inputContainer}>
            <Text style={styles.titleText}>{comments.length} Şərh</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={{ marginEnd: 6 }}>
              <FontAwesome name="close" size={22} color="black" />
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : comments.length === 0 ? (
            <Text style={styles.emptyText}>Henüz yorum yok. İlk yorumu siz yazın!</Text>
          ) : (
            <FlatList
              ref={flatListRef}
              data={comments}
              keyExtractor={(item) => item.id}
              renderItem={renderComment}
              contentContainerStyle={styles.flatListContent}
              keyboardShouldPersistTaps="handled"
            />
          )}

          <View style={styles.newCommentContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Şərh yazın..."
              value={newComment}
              onChangeText={setNewComment}
              onSubmitEditing={handleAddComment}
              blurOnSubmit={false}
            />
            <Button title="Göndər" onPress={handleAddComment} color="green" />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {renderReplyModal()}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 0,
    height: "65%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalContent2: {
    backgroundColor: "white",
    padding: 0,
    height: "50%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  commentContainer: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  commentInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
  },
  commentText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 50,
  },
  commentActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginLeft: 50,
  },
  likeText: {
    fontSize: 14,
    color: "#007BFF",
  },
  replyText: {
    fontSize: 14,
    color: "#007BFF",
  },
  deleteText: {
    fontSize: 14,
    color: "#FF0000",
  },
  replyContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    marginTop: 5,
  },
  replyProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  replyTextContainer: {
    flex: 1,
  },
  replyUser: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#555",
  },
  replyInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
    marginLeft: 10,
    paddingHorizontal: 5,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    marginRight: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "semibold",
    marginBottom: 10,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  newCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  flatListContent: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
  replyListContainer: {
    flex: 1,
    padding: 10,
  },
  replyButton1: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    gap: 5,
  },
});

export default CommentsScreen;
