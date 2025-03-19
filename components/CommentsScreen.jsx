import React, { useState, useEffect } from "react";
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
} from "react-native";
import Modal from "react-native-modal";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { db } from "../firebaseConfig";
import { Button } from "react-native-elements";
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
  const fadeAnim = useState(new Animated.Value(0))[0];

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
          profileImage: "https://i.pinimg.com/736x/03/92/e1/0392e183349301cb9bc7e9752c6a4723.jpg", // Profil resmi URL'si
        });
        setNewComment("");
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
            profileImage: "https://i.pinimg.com/736x/03/92/e1/0392e183349301cb9bc7e9752c6a4723.jpg", // Profil resmi URL'si
          }),
        });
        setReplyText("");
        setSelectedCommentId(null);
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

  const renderComment = ({ item }) => (
    <Animated.View style={[styles.commentContainer, { opacity: fadeAnim }]}>
      <View style={styles.commentHeader}>
        <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
        <Text style={styles.userName}>{item.user}</Text>
      </View>
      <Text style={styles.commentText}>{item.text}</Text>
      <View style={styles.commentActions}>
        <TouchableOpacity onPress={() => handleLike(item.id)}>
          <Text style={styles.likeText}>
            <AntDesign name="like2" size={20} color="black" /> {item.likes}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCommentId(item.id)}>
          <Text style={styles.replyText}>Cavab</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteComment(item.id)}>
          <Text style={styles.deleteText}>Sil</Text>
        </TouchableOpacity>
      </View>

      {item.replies &&
        item.replies.map((reply, index) => (
          <View key={index} style={styles.replyContainer}>
            <Image source={{ uri: reply.profileImage }} style={styles.replyProfileImage} />
            <View style={styles.replyTextContainer}>
              <Text style={styles.replyUser}>{reply.user}</Text>
              <Text style={styles.replyText}>{reply.text}</Text>
            </View>
          </View>
        ))}

      {selectedCommentId === item.id && (
        <View style={styles.replyInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Cavab yazın..."
            value={replyText}
            onChangeText={setReplyText}
          />
          <Button title="Göndər" onPress={() => handleAddReply(item.id)} />
        </View>
      )}
    </Animated.View>
  );

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
              data={comments}
              keyExtractor={(item) => item.id}
              renderItem={renderComment}
              contentContainerStyle={styles.flatListContent}
            />
          )}

          <View style={styles.newCommentContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Şərh yazın..."
              value={newComment}
              onChangeText={setNewComment}
            />
            <Button title="Göndər" onPress={handleAddComment} color="green" />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  commentText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 50, // Profil resmi ile hizalama
  },
  commentActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginLeft: 50, // Profil resmi ile hizalama
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
    paddingLeft: 50, // Profil resmi ile hizalama
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
    marginTop: 10,
    marginLeft: 50, // Profil resmi ile hizalama
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
});

export default CommentsScreen;