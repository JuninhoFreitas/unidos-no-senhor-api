import { Transform } from 'class-transformer';
import { DateFormat } from 'src/utils/date-format';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Membro {
  // UUID V4
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 190 })
  nome: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  telefone: string;

  @Transform(({ value }) => {
    return DateFormat.revert(value);
  })
  @Column({ type: 'date', nullable: true })
  dataNascimento: string;

  @Transform(({ value }) => {
    return DateFormat.revert(value);
  })
  @Column({ type: 'date', nullable: true })
  dataBatismo: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  cargo: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  endereco: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  bairro: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  cidade: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  cep: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  conjuge: string;

  @Transform(({ value }) => {
    return DateFormat.revert(value);
  })
  @Column({ type: 'date', nullable: true })
  dataEntrada: string;

  @Transform(({ value }) => {
    return DateFormat.revert(value);
  })
  @Column({ type: 'date', nullable: true })
  dataSaida: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  situacao: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  observacao: string;
}
