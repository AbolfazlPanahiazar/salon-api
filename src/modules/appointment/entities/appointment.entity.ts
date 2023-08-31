import { BaseEntity } from 'src/core/entities.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'appointments' })
export class AppointmentEntity extends BaseEntity<AppointmentEntity> {
    salon_id
    salon
    service_id
    service
    status
    price
    discount
    user_id
    user
    expire_date
    finish_date
}
