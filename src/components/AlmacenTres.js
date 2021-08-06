import React, { useEffect, useState } from 'react'
import {db} from '../firebase'

import { toast } from 'react-toastify';

const AlmacenTres = () => {
    function searchingTerm(term){
        return function(x){
          return x.nombre.includes(term) || !term
        }
      }
    
        const valoresIniciales = {
            
            nombre:"",
            stock:"",
            detalle:"",
            tallaM:"",
            tallaL:"",
            tallaXL:"",
            tallaXXL:"",
            color:"",
            imagen:""
        }
    
        const [items, setItems] = useState(valoresIniciales)
        const [productos, setProductos] = useState([])
        const [item, setItem] = useState("")
    
        // estados del buscador
        const [data, setData] = useState([])
        const [term, setTerm] = useState("")
    
        // useefect para vver el render
        useEffect(()=>{
          setData(productos)
        },[productos])
    
        const inputChange = (e) =>{
            const {name, value} = e.target 
            setItems({...items, [name]:value})
        }
    
        const submit = (e)=>{
            e.preventDefault()
            saveItems(items)
            setItems({...valoresIniciales})
        } 
    
        const saveItems = async (valores)=>{
          if(item === ''){
            await db.collection('almacen3').doc().set(valores)
            toast.success('Producto Guardado', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          }
          else{
            await db.collection('almacen3').doc(item).update(valores)
            toast.info('Producto Actualizado', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          }
          setItem('')
            
        }
    
        const EliminarProducto = async (id)=>{
          await db.collection('almacen3').doc(id).delete()
          toast.error('Producto eliminado', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
        
        const getProductos = ()=>{
            db.collection('almacen3').onSnapshot((querySnapshot)=>{
                const docs = []
                querySnapshot.forEach((doc)=>{
                    docs.push({...doc.data(), id: doc.id})
                })
                setProductos(docs)
            })
        }
    
        useEffect(() => {
            getProductos()
        }, [])
    
    
        // funciones para editar
    
        const getOne = async (id)=>{
          const doc = await db.collection('almacen3').doc(id).get()
          setItems({...doc.data()})
        }
    
        useEffect(()=>{
          if( item !== ''){
          //   setItems({...valoresIniciales})
          // }
          // else
          // {
          //   getOne(item)
          // }
            getOne(item)
          }
        },[item])
    
    return (
        <div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h2 className="text-center mt-4 mb-4">
                Agregar o actualizar productos
              </h2>

              {/* formulario */}

              <form className="card card-body formulario" onSubmit={submit}>
                <div className="form-group mb-4">
                  <input
                    type="text"
                    placeholder="ingresa el nombre de la categoria"
                    className="form-control"
                    onChange={inputChange}
                    name="detalle"
                    value={items.detalle}
                    required
                  />
                </div>

                <div className="form-group">
                  <textarea
                    rows="4"
                    placeholder="Detalle del producto"
                    className="form-control mb-4"
                    name="nombre"
                    onChange={inputChange}
                    value={items.nombre}
                    required
                  ></textarea>
                </div>

                <div className="form-group mb-4">
                  <input
                    type="text"
                    placeholder="cantidad de stock"
                    className="form-control"
                    onChange={inputChange}
                    name="stock"
                    value={items.stock}
                    required
                  />
                </div>

                

                <div className="form-group mb-4">
                  <input
                    type="text"
                    placeholder="talla M"
                    className="form-control"
                    onChange={inputChange}
                    name="tallaM"
                    value={items.tallaM}
                  />
                </div>

                <div className="form-group mb-4">
                  <input
                    type="text"
                    placeholder="talla L"
                    className="form-control"
                    onChange={inputChange}
                    name="tallaL"
                    value={items.tallaL}
                  />
                </div>

                <div className="form-group mb-4">
                  <input
                    type="text"
                    placeholder="talla XL"
                    className="form-control"
                    onChange={inputChange}
                    name="tallaXL"
                    value={items.tallaXL}
                  />
                </div>

                <div className="form-group mb-4">
                  <input
                    type="text"
                    placeholder="talla XXL"
                    className="form-control"
                    onChange={inputChange}
                    name="tallaXXL"
                    value={items.tallaXXL}
                  />
                </div>

                <div className="form-group mb-4">
                  <input
                    type="text"
                    placeholder="ingresa el color del producto"
                    className="form-control"
                    onChange={inputChange}
                    name="color"
                    value={items.color}
                  />
                </div>

                <div className="form-group mb-4">
                  <input
                    type="text"
                    placeholder="ingresa el link de la imagen del producto"
                    className="form-control"
                    onChange={inputChange}
                    name="imagen"
                    value={items.imagen}
                    required
                  />
                </div>

                <button className="btn btn-primary">{ item === '' ? 'GUARDAR' : 'ACTUALIZAR'}</button>
              </form>
            </div>
            {/* columna de productos */}
            <div className="col-md-8">
              <h2 className="mt-4 mb-4 text-center">PRODUCTOS</h2>

              {/* input para buscar o filtrar */}
              {data && (
                <div className="form-group mb-4 d-flex justify-content-center">
                  <i class="fas fa-search icono"></i>
                  <input
                    type="text"
                    placeholder="Buscar"
                    className="form-control"
                    name="term"
                    onChange={(e) => setTerm(e.target.value)}
                  />
                </div>
              )}
              {/* pintar los productos */}
              <div className="row row-cols-1 row-cols-md-2 g-4">
                {data.filter(searchingTerm(term)).map((producto) => (
                  <div className="col">
                    <div className="card" key={producto.id}>
                      <img
                        src={producto.imagen}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title text-center">
                          {producto.detalle}
                        </h5>
                        
                        <p className="card-text"><strong>Stock:</strong> {producto.stock}</p>
                        <p className="card-text"><strong>Detalle del producto:</strong> {producto.nombre}</p>
                        <p className="card-text"><strong>Talla M:</strong> {producto.tallaM}</p>
                        <p className="card-text"><strong>Talla L:</strong> {producto.tallaL}</p>
                        <p className="card-text"><strong>Talla XL:</strong> {producto.tallaXL}</p>
                        <p className="card-text"><strong>Talla XXL:</strong> {producto.tallaXXL}</p>
                        <p className="card-text"><strong>Color:</strong> {producto.color}</p>
                        <button
                          className="btn btn-danger m-1"
                          onClick={() => EliminarProducto(producto.id)}
                        >
                          <i class="fas fa-trash-alt m-1"></i>eliminar
                        </button>
                        <button className="btn btn-success" onClick={()=>setItem(producto.id)}><i class="fas fa-pencil-alt m-1"></i>editar</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* aqui acaba el pintado */}
            </div>
          </div>
        </div>
      </div>
    )
}

export default AlmacenTres
