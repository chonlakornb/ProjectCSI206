import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js'; // Import recommendation routes

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Catalog API Document',
      version: '1.0.0',
      description: `
        กระผม ชลกร บัวหลวง รหัส 66090864 
        สาขาวิชาวิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์
        คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม 
        เป็นผู้สร้าง Book Catalog API พร้อมจัดทำเอกสารฉบับนี้
        
        โครงการนี้เป็นระบบ API ตามมาตรฐาน OpenAPI 3.0 ประกอบด้วย:
        - Auth - จำนวน 4 APIs
        - Books - จำนวน 7 APIs
        - Categories - จำนวน 4 APIs
        - Favorites - จำนวน 3 APIs
        - Notifications - จำนวน 3 APIs
        - Users - จำนวน 4 APIs
        - Recommendations - จำนวน 3 APIs

        ## รายละเอียด API 
        แต่ละ API สามารถดูรายละเอียดเพิ่มเติมด้านล่าง
        กลุ่มผมมี 2 คนครับ
        (╥﹏╥)
      `,
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Connect to MongoDB
await connectDB();

// Use routes
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', bookRoutes);
app.use('/api', categoryRoutes);
app.use('/api', favoriteRoutes);
app.use('/api', notificationRoutes);
app.use('/api', recommendationRoutes); // Use recommendation routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

