import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { getTypes, postPokemons, getPokemons } from "../Redux/actions/actions";
import "../css/PokemonCreate.css";

function validate(input) {
  let errors = {};
  const rules = [
    { field: "name", message: "Ingrese un nombre" },
    { field: "hp", min: 1, max: 999, message: "La vida debe ser entre 1 a 999" },
    { field: "attack", min: 1, max: 999, message: "El ataque debe ser entre 1 a 999" },
    { field: "defense", min: 1, max: 999, message: "La defensa debe ser entre 1 a 999" },
    { field: "speed", min: 1, max: 999, message: "La velocidad debe ser entre 1 a 999" },
    { field: "weight", min: 1, max: 999, message: "El peso debe ser entre 1 a 999" },
    { field: "height", min: 1, max: 999, message: "La altura debe ser entre 1 a 999" },
  ];

  rules.forEach(({ field, min, max, message }) => {
    if (!input[field] || (min && input[field] < min) || (max && input[field] > max)) {
      errors[field] = message;
    }
  });

  return errors;
}

export default function CreatePokemon() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);

  const [input, setInput] = useState({
    name: "",
    hp: 1,
    attack: 1,
    defense: 1,
    speed: 1,
    height: 1,
    weight: 1,
    type: [],
    image: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  const handleInputChange = useCallback((e) => {
    setInput((prevInput) => {
      const newInput = { ...prevInput, [e.target.name]: e.target.value };
      setErrors(validate(newInput));
      return newInput;
    });
  }, []);

  const handleSelect = useCallback((e) => {
    const selectedType = e.target.value;
    if (!input.type.includes(selectedType)) {
      setInput((prevInput) => ({ ...prevInput, type: [...prevInput.type, selectedType] }));
    }
  }, [input.type]);

  const handleDelete = useCallback((typeToRemove) => {
    setInput((prevInput) => ({ ...prevInput, type: prevInput.type.filter((t) => t !== typeToRemove) }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const validationErrors = validate(input);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length || !input.type.length) {
        alert("Datos erróneos o faltantes");
        return;
      }

      dispatch(postPokemons(input));
      alert("¡Pokemon capturado con éxito!");
      history.push("/home");
    },
    [input, dispatch, history]
  );

  return (
    <div className="containerForm">
      <h1 className="tittle">¡Captura tu Pokémon!</h1>
      <form className="formCreate" onSubmit={handleSubmit}>
        {Object.keys(input).map((field) => (
          field !== "type" && (
            <div key={field}>
              <input
                type={field === "name" || field === "image" ? "text" : "number"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                value={input[field]}
                onChange={handleInputChange}
                className="inputsss"
              />
              {errors[field] && <p>{errors[field]}</p>}
            </div>
          )
        ))}
        <select className="selectGen" onChange={handleSelect}>
          <option value="">Tipos</option>
          {types?.map((t, i) => (
            <option key={i} value={t}>
              {t}
            </option>
          ))}
        </select>
        <div className="genresSelec">
          {input.type.map((t, i) => (
            <div key={i} className="genreX">
              <p>{t}</p>
              <button className="butonX" onClick={() => handleDelete(t)}>
                X
              </button>
            </div>
          ))}
        </div>
        <button className="buttonCrear" type="submit">
          Capturar
        </button>
        <Link className="backBut" to="/home">
          Volver
        </Link>
      </form>
    </div>
  );
}
