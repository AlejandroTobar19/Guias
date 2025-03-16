export const createNotificationsSlice = (set) => ({
    notification: null, 
  
   
    showNotification: (message, type = "success") => {
      set({ notification: { message, type } });
  
      // limitante de tiempo
      setTimeout(() => {
        set({ notification: null });
      }, 3000);
    },
  });
  