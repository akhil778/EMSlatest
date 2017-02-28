var db_url = process.env.DBURL || 'localhost';

module.exports = {
	url : 'mongodb://'+ db_url +'/ems_master'
}