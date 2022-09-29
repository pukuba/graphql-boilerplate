import _ from 'lodash';
import { DataSource } from 'typeorm';
import { getConstant } from '~/common/lib/constant';
import { UserEntity } from '~/core/user/user.entity';

export const getDataSource = _.memoize(async () => {
	const datasource = new DataSource({
		type: "mysql",
		host: getConstant("DB_HOST"),
		port: getConstant("DB_PORT"),
		username: getConstant("DB_USERNAME"),
		password: getConstant("DB_PASSWORD"),
		database: getConstant("DB_DATABASE"),
		synchronize: getConstant("DEPLOY_MODE") !== "prod",
		logging: getConstant("DEPLOY_MODE") !== "prod",
		entities: [UserEntity],
		logger: "advanced-console",
		dropSchema: false,
		connectTimeout: 1000,
		timezone: "Z",
		extra: {
			connectionLimit: 100,
			enableKeepAlive: true,
		},
	});
	const mysql = await datasource.initialize();
	return mysql;
});
