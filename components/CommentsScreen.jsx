import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
const CommentsScreen = ({ isModalVisible, setIsModalVisible }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: `${comments.length + 1}`,
          text: newComment,
          likes: 0,
          replies: [],
        },
      ]);
      setNewComment("");
    }
  };

  const handleLikeComment = (id) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  const handleAddReply = (commentId) => {
    if (replyText.trim()) {
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    id: `${commentId}.${comment.replies.length + 1}`,
                    text: replyText,
                    likes: 0,
                  },
                ],
              }
            : comment
        )
      );
      setReplyText("");
      setSelectedCommentId(null);
    }
  };

  return (
    <Modal
    isVisible={isModalVisible}
    style={styles.modalStyle}
    onBackdropPress={() => setIsModalVisible(false)}
    onSwipeComplete={() => setIsModalVisible(false)}
    backdropOpacity={0.7} // Arka planı hafif karart
    backdropTransitionOutTiming={500} // Arka planın kapanma süresi
    animationIn="slideInUp" // Aşağıdan yukarıya doğru açılma
    animationOut="slideOutDown" // Aşağıya kayarak kapanma
    useNativeDriver={true} // Performans için native driver kullan
    useNativeDriverForBackdrop={true} // Arka plan efektlerinde de native driver kullan
  >
      <View style={styles.modalContent}>
        <View style={styles.inputContainer}>
          <View></View>
          <Text style={styles.titleText}>{comments.length} Şərh</Text>
          <TouchableOpacity onPress={() => setIsModalVisible(false)} style={{marginEnd:6}}>
            <FontAwesome name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text style={styles.commentText}>{item.text}</Text>
              <View style={styles.commentActions}>
                <TouchableOpacity onPress={() => handleLikeComment(item.id)}>
                  <Text style={styles.likeText}>
                    <AntDesign name="like2" size={24} color="black" />{" "}
                    {item.likes}
                  </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => setSelectedCommentId(item.id)}>
                  <Text style={styles.replyText}>Cavab</Text>
                </TouchableOpacity> */}
              </View>
              {/* {item.replies.length > 0 && (
                <FlatList
                  data={item.replies}
                  keyExtractor={(reply) => reply.id}
                  renderItem={({ item: reply }) => (
                    <View style={styles.replyContainer}>
                      <Text style={styles.replyText}>{reply.text}</Text>
                      <TouchableOpacity onPress={() => handleLikeComment(reply.id)}>
                        <Text style={styles.likeText}>Beğen {reply.likes}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              )} */}
              {selectedCommentId === item.id && (
                <View style={styles.replyInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="cavab yazın"
                    value={replyText}
                    onChangeText={setReplyText}
                  />
                  <Button
                    title="cavab"
                    onPress={() => handleAddReply(item.id)}
                  />
                </View>
              )}
            </View>
          )}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Şərh yazın . . ."
          value={newComment}
          onChangeText={setNewComment}
        />
        <Button title="Göndər" onPress={handleAddComment} color='green'/>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    justifyContent: "flex-end",
    margin:0,
    
  },
  modalContent: {
    backgroundColor: "white",
    padding: 0,
    height: "55%", // Modal yüksekliği\
    borderRadius: 10, // Modal kenarına yuvarlanma
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Android'da efekt
   
  },
  commentContainer: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  commentText: {
    fontSize: 16,
    color: "#333",
  },
  commentActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  likeText: {
    fontSize: 14,
    color: "#007BFF",
  },
  replyText: {
    fontSize: 14,
    color: "#007BFF",
  },
  replyContainer: {
    paddingLeft: 20,
    marginTop: 5,
    borderLeftWidth: 2,
    borderLeftColor: "#ddd",
  },
  replyInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    marginTop: 15,
    borderRadius:10,
    backgroundColor: "white",
    width:"90%",
    margin:'auto'
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingRight: 10,
    paddingTop: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
    zIndex: 100,
    
  },
});

export default CommentsScreen;
