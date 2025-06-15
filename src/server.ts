import express from 'express';
// import { Express } from 'express';
import { serverConfig } from './config';
import v1Router from './routers/v1/index.router';
import { genericErrorHandeler } from './middlewares/error.middleware';
import logger from './config/logger.config';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';
import sequelize from './db/models/sequelize';

// const app:Express = express();
const app = express();

app.use(express.json());
// app.use(express.text());

app.use(attachCorrelationIdMiddleware);
app.use('/api/v1', v1Router);  

app.use(genericErrorHandeler);

app.listen(serverConfig.PORT, async () => {
    console.log(`Server is listening at http://localhost:${serverConfig.PORT}`);
    logger.info(`Press Ctrc+c to stop the server`, {name: "Dev server"});

    try {
        await sequelize.authenticate();
        logger.info('DB Connection Success');

        // const hotel = await Hotel.create({
        //     name: 'Hotel Newyork',
        //     address: 'somewhere',
        //     location: 'Los Angeles',
        //     rating: 4.5,
        //     ratingCount: 100
        // })
        // logger.info('Hotel creared', hotel.toJSON());

        // const hotels = await Hotel.findAll();
        // logger.info('Hotelks', hotels);
    } catch (error) {
        logger.error('Something went wrong with DB connection');
    }
})