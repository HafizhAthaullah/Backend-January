-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_memberId_fkey`;

-- DropIndex
DROP INDEX `User_memberId_key` ON `user`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
