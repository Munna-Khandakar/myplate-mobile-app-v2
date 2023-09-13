import create from 'zustand';
const useProfileStore = create(set => ({
  myAddress: {
    id: '2',
    type: 'saved',
    body: 'House 132/A, Mirpur DOHS, Mirpur 12, Dhaka',
  },

  storeMyAddress: address =>
    set(state => ({
      myAddress: address,
    })),
}));
export default useProfileStore;
