import User from "../module/user.Module.js";
import { FIXED_TRAVEL_ACHIEVEMENTS } from "./achievement.js";

export const grantAchievement = async (userId, achievementKey) => {
  const achievement = FIXED_TRAVEL_ACHIEVEMENTS.find(
    (a) => a.key === achievementKey
  );

  if (!achievement) return;

  const user = await User.findById(userId);

  const alreadyExists = user.travelAchievements.some(
    (a) => a.key === achievementKey
  );

  if (alreadyExists) return;

  user.travelAchievements.push({
    ...achievement,
    achievedAt: new Date(),
  });

  await user.save();
};
