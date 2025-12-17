import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('project')
export class ProjectEntity {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  id: string;

  @Column({ type: 'jsonb' })
  data: any;
}


