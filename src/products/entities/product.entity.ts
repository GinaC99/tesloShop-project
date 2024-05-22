import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";


@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique:true
    })
    title: string;

    @Column('numeric', 
    {
        default: 0
    })
    price:number;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column({
        unique:true,
        type: 'text',
        // default: ""
    })
    slug:string;
    
    @Column('int', 
    {
        default: 0
    })
    stock:number;

    @Column('text', 
    {
        array: true
    })
    sizes:string[];

    @Column('text')
    gender:string;

    @Column('text',{
        array:true,
        default: []
    })
    tags:string[];

    @OneToMany(
        () => ProductImage,
        (productImage)=> productImage.product,
        {cascade:true}
    )
    image?:ProductImage

    @BeforeInsert()
    checkSlugInsert(){
        this.slug = this.slug ? this.slug : this.title
        this.slug = this.slug
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '')
    }

    @BeforeUpdate()
    checkSlugBeoreUpdate(){
        this.slug = this.slug.toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '')
    }
}