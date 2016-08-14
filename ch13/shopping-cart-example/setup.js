/**
 * Module dependencies
 */

var mysql = require('mysql'),
    config = require('./config');

/**
 * Initialize client.
 */

delete config.database;
var connection = mysql.createConnection(config);

/**
 * Create database.
 */

connection.query('CREATE DATABASE IF NOT EXISTS `cart-example`');
connection.query('USE `cart-example`');

/**
 * Create tables.
 */

connection.query('DROP TABLE IF EXISTS item');
connection.query('CREATE TABLE item (' +
    'id INT(11) AUTO_INCREMENT, ' +
    'title VARCHAR(255), ' +
    'description TEXT, ' +
    'created DATETIME, ' +
    'PRIMARY KEY (id))');
connection.query('DROP TABLE IF EXISTS review');
connection.query('CREATE TABLE review (' +
    'id INT(11) AUTO_INCREMENT, ' +
    'item_id INT(11), ' +
    'text TEXT, ' +
    'stars INT(1), ' +
    'created DATETIME, ' +
    'PRIMARY KEY (id))');

/**
 * Close connection.
 */

connection.end(function() {
  process.exit();
});
