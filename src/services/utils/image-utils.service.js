import { updatePostItem } from '@redux/reducers/post/post.reducer';

export class ImageUtils {
  static validateFile(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    return file && validTypes.indexOf(file.type) > -1;
  }

  static checkFileSize(file) {
    let fileError = '';
    const isValid = ImageUtils.validateFile(file);
    if (!isValid) {
      fileError = `File ${file.name} not accepted`;
    }
    if (file.size > 50000000) {
      // 50 MB
      fileError = 'File is too large.';
    }
    return fileError;
  }

  static checkFile(file) {
    if (!ImageUtils.validateFile(file)) {
      return window.alert(`File ${file.name} not accepted`);
    }
    if (ImageUtils.checkFileSize(file)) {
      return window.alert(ImageUtils.checkFileSize(file));
    }
  }

  static addFileToRedux(event, post, setSelectedPostImage, dispatch) {
    const file = event.target.files[0];
    ImageUtils.checkFile(file);
    setSelectedPostImage(file);
    dispatch(
      updatePostItem({
        image: URL.createObjectURL(file),
        gifUrl: '',
        imgId: '',
        imgVersion: '',
        post
      })
    );
  }

  static readAsBase64(file) {
    const reader = new FileReader();
    const fileValue = new Promise((resolve, reject) => {
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });

      reader.addEventListener('error', (event) => {
        reject(event);
      });

      reader.readAsDataURL(file);
    });
    return fileValue;
  }

  static getBackgroundImageColor(imageUrl) {
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    const backgroundImageColor = new Promise((resolve, reject) => {
      image.addEventListener('load', () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const params = imageData.data;
        const bgColor = ImageUtils.convertRGBToHex(params[0], params[1], params[2]);
        resolve(bgColor);
      });

      image.addEventListener('error', (event) => {
        reject(event);
      });

      image.src = imageUrl;
    });
    return backgroundImageColor;
  }

  static convertRGBToHex(red, green, blue) {
    red = red.toString(16);
    green = green.toString(16);
    blue = blue.toString(16);

    red = red.length === 1 ? '0' + red : red;
    green = green.length === 1 ? '0' + green : green;
    blue = blue.length === 1 ? '0' + blue : blue;
    return `#${red}${green}${blue}`;
  }
}
