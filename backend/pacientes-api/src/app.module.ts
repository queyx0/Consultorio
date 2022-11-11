import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsultasController } from './controllers/consultas.controller';
import { PacientesController } from './controllers/pacientes.controller';
import { Consulta } from './models/consulta.module';
import { Paciente } from './models/paciente.module';
import { ConsultaService } from './services/consultas.service';
import { PacientesService } from './services/pacientes.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'admin',
      database: 'consultorio',
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([Paciente, Consulta]),
  ],
  controllers: [AppController, PacientesController, ConsultasController],
  providers: [AppService, PacientesService, ConsultaService],
})
export class AppModule {}
