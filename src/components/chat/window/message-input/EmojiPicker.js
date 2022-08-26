import Picker from 'emoji-picker-react';
import PropTypes from 'prop-types';

const EmojiPicker = ({ onEmojiClick, pickerStyle }) => (
  <div className="emoji-picker" data-testid="emoji-container">
    <Picker
      onEmojiClick={onEmojiClick}
      native={true}
      groupNames={{ smileys_people: 'PEOPLE' }}
      pickerStyle={pickerStyle}
    />
  </div>
);

EmojiPicker.propTypes = {
  onEmojiClick: PropTypes.func,
  pickerStyle: PropTypes.object
};

export default EmojiPicker;
