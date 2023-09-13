import create from 'zustand';
const usePlateStore = create(set => ({
  plates: [],
  newPlate: {
    category: {
      id: 1,
      type: 'Breakfast',
      slug: 'breakfast',
    },
    quantity: 1,
    own_delivery_system: false,
    all_time_available: false,
  },

  storePlates: params =>
    set(state => ({
      plates: [...params, ...state.plates],
    })),

  storeNewPlate: params =>
    set({
      newPlate: params,
    }),
}));
export default usePlateStore;
