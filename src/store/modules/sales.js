import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    data: [
      {
        id: '1',
        percent: 1,
        position: {
          num: 1,
          add: 2,
        },
        photo: 'https://html5css.ru/howto/img_avatar.png',
        vendor: {
          code: '3452454243',
          url: 'https://ya.ru',
        },
        salesChart: [2000, 3000, 2100, 2500, 2000, 3000, 2100, 2500, 2100, 2500, 2000, 3000, 2100,
          2500, 2000, 3000, 2100, 2500, 2100, 2500, 2000, 3000, 2100, 2500, 2000, 3000, 2100,
          2500, 2100, 2500],
        product: {
          name: 'Платье - Marcella',
          link: 'https://ya.ru',
        },
        $_info: {
          favorite: false,
        },
      },
      {
        id: '2',
        percent: 2,
        position: {
          num: 23,
          add: 2,
        },
        photo: 'https://html5css.ru/howto/img_avatar2.png',
        $_info: {
          favorite: false,
        },
      },
      {
        id: '3',
        percent: 3,
        position: {
          num: 1,
          add: 2,
        },
        photo: 'https://html5css.ru/howto/img_avatar.png',
        $_info: {
          favorite: false,
        },
      },
      {
        id: '4',
        percent: 4,
        position: {
          num: 1,
          add: 2,
        },
        photo: 'https://html5css.ru/howto/img_avatar.png',
        $_info: {
          favorite: false,
        },
      },
      {
        id: '5',
        percent: 5,
        position: {
          num: 1,
          add: 2,
        },
        photo: 'https://html5css.ru/howto/img_avatar.png',
        $_info: {
          favorite: false,
        },
      },
      {
        id: '6',
        percent: 6,
        position: {
          num: 1,
          add: 2,
        },
        photo: 'https://html5css.ru/howto/img_avatar.png',
        $_info: {
          favorite: false,
        },
      },
      {
        id: '7',
        percent: 7,
        position: {
          num: 1,
          add: 2,
        },
        photo: 'https://html5css.ru/howto/img_avatar.png',
        $_info: {
          favorite: false,
        },
      },
      {
        id: '8',
        percent: 8,
        position: {
          num: 1,
          add: 2,
        },
        photo: 'https://html5css.ru/howto/img_avatar.png',
        $_info: {
          favorite: false,
        },
      },
      {
        id: '9',
        percent: 5454,
        position: {
          num: 1,
          add: 2,
        },
        photo: 'https://html5css.ru/howto/img_avatar.png',
        $_info: {
          favorite: false,
        },
      },
      {
        id: '10',
        percent: 12341,
        position: {
          num: 1,
          add: 2,
        },
        photo: 'https://html5css.ru/howto/img_avatar.png',
        $_info: {
          favorite: false,
        },
      },
      {
        id: '11',
        percent: 20,
        position: {
          num: 1,
          add: 2,
        },
        photo: 'https://html5css.ru/howto/img_avatar.png',
        $_info: {
          favorite: false,
        },
      },
      {
        id: '12',
        percent: 20,
        position: {
          num: 1,
          add: 2,
        },
        photo: 'https://html5css.ru/howto/img_avatar.png',
        $_info: {
          favorite: false,
        },
      },
      {
        id: '13',
        percent: 20,
        position: {
          num: 1,
          add: 2,
        },
        photo: 'https://html5css.ru/howto/img_avatar.png',
        $_info: {
          favorite: false,
        },
      },
      {
        id: '14',
        percent: 434,
        position: {
          num: 1,
          add: 2,
        },
        photo: 'https://html5css.ru/howto/img_avatar.png',
        $_info: {
          favorite: false,
        },
      },
      {
        id: '15',
        percent: 21,
        position: {
          num: 1,
          add: 2,
        },
        photo: 'https://html5css.ru/howto/img_avatar.png',
        $_info: {
          favorite: false,
        },
      }],
  },
  mutations: {
    toggleFavorite(state, id) {
      const product = state.data.find((item) => item.id === id);

      if (!product.$_info) {
        Vue.set(product, '$_info', {});
      }

      product.$_info.favorite = !product.$_info.favorite;
    },
  },
};
