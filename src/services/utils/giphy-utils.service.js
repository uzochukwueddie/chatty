import { giphyService } from '@services/api/giphy/giphy.service';

export class GiphyUtils {
  static async getTrendingGifs(setGifs, setLoading) {
    setLoading(true);
    try {
      const response = await giphyService.trending();
      setGifs(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  static async searchGifs(gif, setGifs, setLoading) {
    if (gif.length <= 1) {
      GiphyUtils.getTrendingGifs(setGifs, setLoading);
      return;
    }
    setLoading(true);
    try {
      const response = await giphyService.search(gif);
      setGifs(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
}
