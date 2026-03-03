SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

DROP SCHEMA IF EXISTS `restaurant_manage_order`;

CREATE SCHEMA IF NOT EXISTS `restaurant_manage_order` DEFAULT CHARACTER SET utf8;
USE `restaurant_manage_order`;

DROP TABLE IF EXISTS `restaurant_manage_order`.`meal`;

CREATE TABLE IF NOT EXISTS `restaurant_manage_order`.`meal` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `is_available` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `restaurant_manage_order`.`employee`;

CREATE TABLE IF NOT EXISTS `restaurant_manage_order`.`employee` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(254) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `post` ENUM('employee', 'admin', 'manager') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `restaurant_manage_order`.`customer_order`;

CREATE TABLE IF NOT EXISTS `restaurant_manage_order`.`customer_order` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `client_name` VARCHAR(45) NOT NULL,
  `creation_date` DATETIME NOT NULL DEFAULT NOW(),
  `order_served` TINYINT NOT NULL,
  `total_price` DECIMAL(10,2) NOT NULL,
  `employee_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_order_employee_idx` (`employee_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_employee`
    FOREIGN KEY (`employee_id`)
    REFERENCES `restaurant_manage_order`.`employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `restaurant_manage_order`.`order_has_meal`;

CREATE TABLE IF NOT EXISTS `restaurant_manage_order`.`order_has_meal` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `meal_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_order_has_meal_meal1_idx` (`meal_id` ASC) VISIBLE,
  INDEX `fk_order_has_meal_order1_idx` (`order_id` ASC) VISIBLE,
  INDEX `unique_order_meal` (`order_id` ASC, `meal_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_has_meal_order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `restaurant_manage_order`.`customer_order` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_has_meal_meal1`
    FOREIGN KEY (`meal_id`)
    REFERENCES `restaurant_manage_order`.`meal` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
