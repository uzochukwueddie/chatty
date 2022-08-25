import { addUser } from '@redux/reducers/user/user.reducer';
import { followerService } from '@services/api/followers/follower.service';
import { socketService } from '@services/socket/socket.service';
import { Utils } from '@services/utils/utils.service';
import { cloneDeep, filter, find, findIndex } from 'lodash';

export class FollowersUtils {
  static async followUser(user, dispatch) {
    const response = await followerService.followUser(user?._id);
    Utils.dispatchNotification(response.data.message, 'success', dispatch);
  }

  static async unFollowUser(user, profile, dispatch) {
    const response = await followerService.unFollowUser(user?._id, profile?._id);
    Utils.dispatchNotification(response.data.message, 'success', dispatch);
  }

  static async blockUser(user, dispatch) {
    const response = await followerService.blockUser(user?._id);
    Utils.dispatchNotification(response.data.message, 'success', dispatch);
  }

  static async unblockUser(user, dispatch) {
    const response = await followerService.unblockUser(user?._id);
    Utils.dispatchNotification(response.data.message, 'success', dispatch);
  }

  static socketIOFollowAndUnfollow(users, followers, setFollowers, setUsers) {
    socketService?.socket?.on('add follower', (data) => {
      const userData = find(users, (user) => user._id === data?._id);
      if (userData) {
        const updatedFollowers = [...followers, data];
        setFollowers(updatedFollowers);
        FollowersUtils.updateSingleUser(users, userData, data, setUsers);
      }
    });

    socketService?.socket?.on('remove follower', (data) => {
      const userData = find(users, (user) => user._id === data?._id);
      if (userData) {
        const updatedFollowers = filter(followers, (follower) => follower._id !== data?._id);
        setFollowers(updatedFollowers);
        FollowersUtils.updateSingleUser(users, userData, data, setUsers);
      }
    });
  }

  static socketIORemoveFollowing(following, setFollowing) {
    socketService?.socket?.on('remove follower', (data) => {
      const updatedFollowing = filter(following, (user) => user._id !== data?._id);
      setFollowing(updatedFollowing);
    });
  }

  static socketIOBlockAndUnblock(profile, token, setBlockedUsers, dispatch) {
    socketService?.socket?.on('blocked user id', (data) => {
      const user = FollowersUtils.addBlockedUser(profile, data);
      setBlockedUsers(profile?.blocked);
      dispatch(addUser({ token, profile: user }));
    });

    socketService?.socket?.on('unblocked user id', (data) => {
      const user = FollowersUtils.removeBlockedUser(profile, data);
      setBlockedUsers(profile?.blocked);
      dispatch(addUser({ token, profile: user }));
    });
  }

  static socketIOBlockAndUnblockCard(user, setUser) {
    socketService?.socket?.on('blocked user id', (data) => {
      const userData = FollowersUtils.addBlockedUser(user, data);
      setUser(userData);
    });

    socketService?.socket?.on('unblocked user id', (data) => {
      const userData = FollowersUtils.removeBlockedUser(user, data);
      setUser(userData);
    });
  }

  static addBlockedUser(user, data) {
    user = cloneDeep(user);
    if (user?._id === data.blockedBy) {
      user.blocked.push(data.blockedUser);
    }

    if (user?._id === data.blockedUser) {
      user.blockedBy.push(data.blockedBy);
    }
    return user;
  }

  static removeBlockedUser(profile, data) {
    profile = cloneDeep(profile);
    if (profile?._id === data.blockedBy) {
      profile.blocked = [...Utils.removeUserFromList(profile.blocked, data.blockedUser)];
    }

    if (profile?._id === data.blockedUser) {
      profile.blockedBy = [...Utils.removeUserFromList(profile.blockedBy, data.blockedBy)];
    }
    return profile;
  }

  static updateSingleUser(users, userData, followerData, setUsers) {
    users = cloneDeep(users);
    userData.followersCount = followerData.followersCount;
    userData.followingCount = followerData.followingCount;
    userData.postsCount = followerData.postsCount;
    const index = findIndex(users, ['_id', userData?._id]);
    if (index > -1) {
      users.splice(index, 1, userData);
      setUsers(users);
    }
  }
}
