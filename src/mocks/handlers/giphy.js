import { rest } from 'msw';

const GIPHY_URL = 'https://api.giphy.com/v1/gifs';

export const getTrendingGiphyMock = rest.get(`${GIPHY_URL}/trending`, (req, res, ctx) => {
  const result = {
    data: [
      {
        images: {
          original: {
            height: '152',
            width: '245',
            size: '1187001',
            url: 'https://media1.giphy.com/media/qg5pk8s2h5kJy/giphy.gif?cid=b6f691b6xs6w6z065eld5ihx7moh2xlo0fyofdhij5zp9xn4&rid=giphy.gif&ct=g',
            mp4_size: '1274278',
            mp4: 'https://media1.giphy.com/media/qg5pk8s2h5kJy/giphy.mp4?cid=b6f691b6xs6w6z065eld5ihx7moh2xlo0fyofdhij5zp9xn4&rid=giphy.mp4&ct=g',
            webp_size: '748192',
            webp: 'https://media1.giphy.com/media/qg5pk8s2h5kJy/giphy.webp?cid=b6f691b6xs6w6z065eld5ihx7moh2xlo0fyofdhij5zp9xn4&rid=giphy.webp&ct=g',
            frames: '87',
            hash: '6e1124b7ba366541452f9cee813995b2'
          }
        }
      }
    ],
    pagination: {
      total_count: 555,
      count: 1,
      offset: 0
    },
    meta: {
      status: 200,
      msg: 'OK',
      response_id: 'xs6w6z065eld5ihx7moh2xlo0fyofdhij5zp9xn4'
    }
  };
  return res(ctx.status(200), ctx.json(result));
});

export const searchGiphyMock = rest.get(`${GIPHY_URL}/search`, (req, res, ctx) => {
  const result = {
    data: [
      {
        images: {
          original: {
            height: '152',
            width: '245',
            size: '1187001',
            url: 'https://media1.giphy.com/media/qg5pk8s2h5kJy/giphy.gif?cid=b6f691b6xs6w6z065eld5ihx7moh2xlo0fyofdhij5zp9xn4&rid=giphy.gif&ct=g',
            mp4_size: '1274278',
            mp4: 'https://media1.giphy.com/media/qg5pk8s2h5kJy/giphy.mp4?cid=b6f691b6xs6w6z065eld5ihx7moh2xlo0fyofdhij5zp9xn4&rid=giphy.mp4&ct=g',
            webp_size: '748192',
            webp: 'https://media1.giphy.com/media/qg5pk8s2h5kJy/giphy.webp?cid=b6f691b6xs6w6z065eld5ihx7moh2xlo0fyofdhij5zp9xn4&rid=giphy.webp&ct=g',
            frames: '87',
            hash: '6e1124b7ba366541452f9cee813995b2'
          }
        }
      }
    ],
    pagination: {
      total_count: 555,
      count: 1,
      offset: 0
    },
    meta: {
      status: 200,
      msg: 'OK',
      response_id: 'xs6w6z065eld5ihx7moh2xlo0fyofdhij5zp9xn4'
    }
  };
  return res(ctx.status(200), ctx.json(result));
});

export const emptySearchGiphyMock = rest.get(`${GIPHY_URL}/search`, (req, res, ctx) => {
  const result = {
    data: [],
    pagination: {},
    meta: {
      status: 200,
      msg: 'OK',
      response_id: 'xs6w6z065eld5ihx7moh2xlo0fyofdhij5zp9xn3'
    }
  };
  return res(ctx.status(200), ctx.json(result));
});

export const giphyHandlers = [getTrendingGiphyMock, searchGiphyMock, emptySearchGiphyMock];
