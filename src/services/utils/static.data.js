import blessed from '@assets/feelings/blessed.jpg';
import excited from '@assets/feelings/excited.jpg';
import happyFeelings from '@assets/feelings/happy.jpg';
import loved from '@assets/feelings/loved.jpg';
import angry from '@assets/reactions/angry.png';
import happy from '@assets/reactions/happy.png';
import like from '@assets/reactions/like.png';
import love from '@assets/reactions/love.png';
import sad from '@assets/reactions/sad.png';
import wow from '@assets/reactions/wow.png';
import {
  FaBirthdayCake,
  FaComments,
  FaGlobe,
  FaHeart,
  FaImages,
  FaKey,
  FaLock,
  FaNewspaper,
  FaRegBell,
  FaRegUser,
  FaUser,
  FaUserCheck,
  FaUserPlus,
  FaUsers
} from 'react-icons/fa';

export const sideBarItems = [
  {
    index: 1,
    name: 'Streams',
    url: '/app/social/streams',
    iconName: 'FaNewspaper'
  },
  {
    index: 2,
    name: 'Chat',
    url: '/app/social/chat/messages',
    iconName: 'FaComments'
  },
  {
    index: 3,
    name: 'People',
    url: '/app/social/people',
    iconName: 'FaUsers'
  },
  {
    index: 4,
    name: 'Following',
    url: '/app/social/following',
    iconName: 'FaUserPlus'
  },
  {
    index: 5,
    name: 'Followers',
    url: '/app/social/followers',
    iconName: 'FaHeart'
  },
  {
    index: 6,
    name: 'Photos',
    url: '/app/social/photos',
    iconName: 'FaImages'
  },
  {
    index: 7,
    name: 'Notifications',
    url: '/app/social/notifications',
    iconName: 'FaRegBell'
  },
  {
    index: 8,
    name: 'Profile',
    url: '/app/social/profile',
    iconName: 'FaRegUser'
  }
];

export const feelingsList = [
  {
    index: 0,
    name: 'happy',
    image: happyFeelings
  },
  {
    index: 1,
    name: 'excited',
    image: excited
  },
  {
    index: 2,
    name: 'blessed',
    image: blessed
  },
  {
    index: 3,
    name: 'loved',
    image: loved
  }
];

export const fontAwesomeIcons = {
  FaNewspaper: <FaNewspaper className="icon" />,
  FaComments: <FaComments className="icon" />,
  FaUsers: <FaUsers className="icon" />,
  FaUserPlus: <FaUserPlus className="icon" />,
  FaHeart: <FaHeart className="icon" />,
  FaImages: <FaImages className="icon" />,
  FaRegBell: <FaRegBell className="icon" />,
  FaBirthdayCake: <FaBirthdayCake className="icon" />,
  FaRegUser: <FaRegUser className="icon" />
};

export const privacyList = [
  {
    topText: 'Public',
    subText: 'Anyone on Chatty',
    icon: <FaGlobe className="globe-icon globe" />
  },
  {
    topText: 'Followers',
    subText: 'Your followers on Chatty',
    icon: <FaUserCheck className="globe-icon globe" />
  },
  {
    topText: 'Private',
    subText: 'For you only',
    icon: <FaLock className="globe-icon globe" />
  }
];

export const bgColors = [
  '#ffffff',
  '#f44336',
  '#e91e63',
  '#2196f3',
  '#9c27b0',
  '#3f51b5',
  '#00bcd4',
  '#4caf50',
  '#ff9800',
  '#8bc34a',
  '#009688',
  '#03a9f4',
  '#cddc39'
];

export const avatarColors = [
  '#f44336',
  '#e91e63',
  '#2196f3',
  '#9c27b0',
  '#3f51b5',
  '#00bcd4',
  '#4caf50',
  '#ff9800',
  '#8bc34a',
  '#009688',
  '#03a9f4',
  '#cddc39',
  '#2962ff',
  '#448aff',
  '#84ffff',
  '#00e676',
  '#43a047',
  '#d32f2f',
  '#ff1744',
  '#ad1457',
  '#6a1b9a',
  '#1a237e',
  '#1de9b6',
  '#d84315'
];

export const emptyPostData = {
  _id: '',
  post: '',
  bgColor: '',
  privacy: '',
  feelings: '',
  gifUrl: '',
  profilePicture: '',
  image: '',
  userId: '',
  username: '',
  email: '',
  avatarColor: '',
  commentsCount: '',
  reactions: [],
  imgVersion: '',
  imgId: '',
  createdAt: ''
};

export const reactionsMap = {
  like,
  love,
  wow,
  sad,
  happy,
  angry
};

export const reactionsColor = {
  like: '#50b5ff',
  love: '#f33e58',
  angry: '#e9710f',
  happy: '#f7b124',
  sad: '#f7b124',
  wow: '#f7b124'
};

export const notificationItems = [
  {
    index: 0,
    title: 'Direct Messages',
    description: 'New direct messages notifications.',
    toggle: true,
    type: 'messages'
  },
  {
    index: 1,
    title: 'Follows',
    description: 'New followers notifications.',
    toggle: true,
    type: 'follows'
  },
  {
    index: 2,
    title: 'Post Reactions',
    description: 'New reactions for your posts notifications.',
    toggle: true,
    type: 'reactions'
  },
  {
    index: 3,
    title: 'Comments',
    description: 'New comments for your posts notifications.',
    toggle: true,
    type: 'comments'
  }
];

export const tabItems = (showPassword, showNotification) => {
  const items = [
    { key: 'Timeline', show: true, icon: <FaUser className="banner-nav-item-name-icon" /> },
    { key: 'Followers', show: true, icon: <FaHeart className="banner-nav-item-name-icon" /> },
    { key: 'Gallery', show: true, icon: <FaImages className="banner-nav-item-name-icon" /> },
    {
      key: 'Change Password',
      show: showPassword,
      icon: <FaKey className="banner-nav-item-name-icon" />
    },
    {
      key: 'Notifications',
      show: showNotification,
      icon: <FaRegBell className="banner-nav-item-name-icon" />
    }
  ];
  return items;
};
