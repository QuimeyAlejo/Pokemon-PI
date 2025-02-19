import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from 'react-router-dom';
import { getTypes, postPokemons, getPokemons} from "../Redux/actions/actions";
// import style from '../css/Form.module.css';

// import validate from '../components/validate'
 import "../css/PokemonCreate.css";



//---------------------------------------------------- // VALIDACION DEL FORMULARIO // -------------------------------------------------------------------------------------------------//
function validate(input){
  let errors = {}
  if(!input.name) errors.name = 'Ingrese un nombre'
  if(!input.hp || input.hp < 1 || input.hp > 999) errors.hp = 'La vida debe ser entre 1 a 999'
  if(!input.attack || input.attack < 1 || input.attack > 999) errors.attack = 'El ataque debe ser entre 1 a 999'
  if(!input.defense || input.defense < 1 || input.defense > 999) errors.defense = 'La defensa debe ser entre 1 a 999'
  if(!input.speed || input.speed < 1 || input.speed > 999) errors.speed = 'La velocidad debe ser entre 1 a 999'
  if(!input.weight || input.weight < 1 || input.weight > 999) errors.weight = 'El peso debe ser entre 1 a 999'
  if(!input.height || input.height < 1 || input.height > 999) errors.height = 'La altura debe ser entre 1 a 999'

  return errors
}

export default function CreatePokemon(){
    const dispatch = useDispatch();
    const history = useHistory()
    const types = useSelector((state)=> state.types)
    console.log(types , 'Estado types')

    const [input, setInput]=useState({
        name: "",
        hp:1  ,
        attack:1,
        defense:1,
        speed:1,
        height:1,
        weight:1,
        type:[],
        image:""
    })
    const [errors, setErrors] = useState({})

    function handleInputChange(e){
        setInput({
          ...input,
          [e.target.name] : e.target.value
        })
        console.log(input)
    }
    function handleSelect(e){
      setInput({
        ...input,
        type:[...input.type , e.target.value]
      })
    }
    function handleSubmit(e){
      e.preventDefault()
      setErrors(validate(input))
      const errorSubmit = validate(input)
      if(Object.values(errorSubmit).length !== 0 || !input.type.length){
          alert('Datos erroneos o faltantes')
      }else{
      dispatch(postPokemons(input))
      alert('¡Pokemon capturado con exito!')
      setInput({
          name: '',
          hp:1,
          attack:1,
          defense:1,
          speed:1,
          height:1,
          weight:1,
          type:[],
          image:""
      })
      history.push('/home')
  }
  }
  function handleDelete(e){
    e.preventDefault()
    setInput({
        ...input,
        type: input.type.filter(g => g !== e.target.value)
    })
}
    useEffect(()=>{
      dispatch(getPokemons())
      dispatch(getTypes())

    },[]);

  //   return(
  //     <div  className={style.containerCreate}>
  //       <Link to='/home'><button>Volver</button></Link>
  //       <h1 className={style.separado}>Captura tu Pokemon!</h1>
  //       <form >
  //         <div className={style.separado}>
          
  //          {errors.name ? <p className="danger">{errors.username}</p> : null}
  //         <p className={style.question}>
  //         <label>Nombre</label>           
  //         <input
  //           type="text"
  //            placeholder="Nombre"
  //            name="name"
  //            value={input.name}
  //            onChange={handleInputChange}
  //           //  //required
  //            />
  //            </p>
  //         </div>
  //         <div className={style.separado}>
  //         {errors.name ? <p className="danger">{errors.username}</p> : null}
  //          <p className={style.question}>
  //         <label>Vida</label>           
  //         <input
  //           type="numero"
  //            placeholder="Vida"
  //            name="hp"
  //            value={input.hp}
  //            onChange={handleInputChange}
  //            //required
  //            />
  //            </p>
  //         </div > 
  //         <div className={style.separado}>
  //         <p className={style.question}>
  //         <label>Velocidad</label>           
  //         <input
  //           type="numero"
  //            placeholder="Velocidad"
  //            name="speed"
  //            value={input.speed}
  //            onChange={handleInputChange}
  //            //required
  //            />
  //           </p>
  //         </div> 
  //         <div  className={style.separado}>
  //         <p className={style.question}>
          // <label>Ataque</label>           
          // <input
          //   type="numero"
          //    placeholder="Ataque"
          //    name="attack"
          //    value={input.attack}
          //    onChange={handleInputChange}
          //    //required
          //    /></p>
  //         </div> <div  className={style.separado}>
  //         <p className={style.question}>
          // <label>Defensa</label>           
          // <input
          //   type="numero"
          //    placeholder="Defensa"
          //    name="defense"
          //    value={input.defense}
          //    onChange={handleInputChange}
          //    //required
          //    /></p>
  //         </div> <div  className={style.separado}>
  //         <p className={style.question}>
          // <label>Altura</label>           
          // <input
          //   type="numero"
          //    placeholder="Altura"
          //    name="height"
          //    value={input.height}
          //    onChange={handleInputChange}
          //    //required
          //    /></p>
  //         </div>

  //         <div  className={style.separado}>
  //         <p className={style.question}>
  //         <label>Peso</label>         
  //         <input
  //           type="numero"
  //            placeholder="Peso"
  //            name="weight"
  //            value={input.weight}
  //            onChange={handleInputChange}
  //            //required
  //            /></p>
  //         </div>

  //         <div  className={style.separado}> 
  //          <p className={style.question}>
  //          <label>Imagen</label>          
  //         <input
  //           type="text"
  //            placeholder="URL de la imagen..."
  //            name="image"
  //            value={input.image}
  //            onChange={handleInputChange}
  //            //required
  //            /> 
  //            </p>
  //         </div>

  //         <select onChange={(e)=>handleSelect(e)}>
  //           {types.map( (e)=>(
  //             <option key={e} value={e}>{e} </option>
  //             ))}
  //         </select>
              
  //             </form>
  //             <div >
  //                       {
  //                         input.type?.map((e, i) => (
  //                               <div key={i} >
  //                                   <p>{e}</p>
  //                                   <br />
  //                                   <button  value={e} onClick={(e) => handleDelete(e)}>X</button>
  //                               </div>
  //                           ))
  //                       }
  //                       {
  //                           errors.type && (
  //                               <p>{errors.type}</p>
  //                               )
  //                           }  
  //                            </div>
  //                            {/* <ul><li>{input.type.map(e=> e + ',')}</li></ul> */}
  //                            {/* <select>{input.type.map(e=> e + ',')}</select> */}
  //           <button onClick={(e) => handleSubmit(e)} type='submit' className={style.submit}>Capturar Pokemon</button>
                    
  //     </div>
  //   )
    
  // }

  return(
    <div className='containerForm'>
    <div className='tittle'>
        <h1>Captura tu Pokemon!</h1>
    </div>
    <div className='boxgrid'>
        <form className='formCreate'>
        <input
            type="text"
             placeholder="Nombre"
             name="name"
             className='inputsss'
             value={input.name}
             onChange={handleInputChange}
            //  //required
             />
            {
                errors.name && (
                    <p>{errors.name}</p>
                )
            }
            <input 
            type="text" 
            placeholder='URL de la imagen...'
            className='inputsss'
            name='image'
            value={input.image}
            onChange={handleInputChange}
            />
           {/* <label>Vida</label>            */}
           <input
            type="numero"
            placeholder="Vida"
             name="hp"
            value={input.hp}
            onChange={handleInputChange}
            className='inputsss'
            //required
             />
          
            {
                errors.hp && (
                    <p>{errors.hp}</p>
                )
            }
              {/* <label>Peso</label>          */}
          <input
            type="numero"
             placeholder="Peso"
             name="weight"
             className='inputsss'
              value={input.weight}
             onChange={handleInputChange}
             //required
            />
            {
                errors.weight && (
                    <p>{errors.weight}</p>
                )
            }
            {/* <label>Altura</label>            */}
          <input
                       className='inputsss'
            type="numero"
             placeholder="Altura"
             name="height"
             value={input.height}
             onChange={handleInputChange}
             //required
             />
            {
                errors.height && (
                    <p>{errors.height}</p>
                )
            }
             {/* <label>Defensa</label>            */}
          <input
            type="numero"
             placeholder="Defensa"
             name="defense"
             className='inputsss'
             value={input.defense}
             onChange={handleInputChange}
             //required
             />
            {
                errors.defense && (
                    <p>{errors.defense}</p>
                )
            }
            {/* <label>Ataque</label>            */}
          <input
            type="numero"
             placeholder="Ataque"
             name="attack"
             className='inputsss'
             value={input.attack}
             onChange={handleInputChange}
             //required
             />
              {
                errors.attack && (
                    <p>{errors.attack}</p>
                )
            }
            {/* <label>Velocidad</label>            */}
           <input
             type="numero"
             placeholder="Velocidad"
             name="speed"
             className='inputsss'
              value={input.speed}
              onChange={handleInputChange}
              //required
              />
               {
                errors.speed && (
                    <p>{errors.speed}</p>
                )
            }
        </form>
        <div className="generos">
            <select className='selectGen' onChange={(e)=>handleSelect(e)}>
                <option>Tipos</option>
                {
                    types?.map((types, i) => {
                        return (
                            <option key={i} value={types}>{types}</option>
                        )
                    })
                }
            </select>
            <div className='genresSelec'>
                {
                    input.type?.map((t, i) => (
                        <div key={i} className='genreX'>
                            <p>{t}</p>
                            <br />
                            <button className='butonX' value={t} onClick={(e) => handleDelete(e)}>X</button>
                        </div>
                    ))
                }
                {
                    errors.types && (
                        <p>{errors.types}</p>
                        )
                    }   
            </div>
        </div>
    </div>
    <div className="buttons">
        <button className='buttonCrear' type='submit' onClick={(e) => handleSubmit(e)}>Capturar</button>
        <Link className='backBut' to='/home'>Volver</Link>
    </div>
</div>

)
}
 