import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user'

export interface AlbumAttributes {
    id: number;
    title: string;
    year: number;
    genre: string[];
    label: string[];
    cover_image: string;
    userId: number;

}

interface AlbumCreationAttributes extends Optional<AlbumAttributes, 'id'> { }

export class Album extends Model<AlbumAttributes, AlbumCreationAttributes> implements AlbumAttributes {
    public id!: number;
    public title!: string;
    public year!: number;
    public genre!: string[];
    public label!: string[];
    public cover_image!: string;
    public userId!: number;
    public readonly assignedUser?: User
}

export function AlbumFactory(sequelize: Sequelize): typeof Album {
    Album.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
                allowNull: false,
        },
        genre: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        label: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        cover_image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },   

    }
    , {
        sequelize,
        tableName: 'albums',
    }
    );
    return Album
}