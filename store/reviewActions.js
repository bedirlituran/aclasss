// Yorumları Redux store'una set etmek için action
export const setReviews = (reviews) => ({
    type: 'SET_REVIEWS',
    payload: reviews,
  });
  
  // Yeni bir yorum eklemek için action
  export const addReview = (review) => ({
    type: 'ADD_REVIEW',
    payload: review,
  });
  