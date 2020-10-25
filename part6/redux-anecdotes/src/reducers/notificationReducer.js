const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification    
    default:
      return state      
  }
}

export const setNotification = (notification, time) => {
  console.log('hi ', notification)
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    if (notification) {
      clearTimeout(time)
    }
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: ''
      })
    }, time * 1000)
  }
}


export default notificationReducer