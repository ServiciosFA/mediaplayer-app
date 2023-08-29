const Times = (milisegundos) => {
  // Convertir milisegundos a segundos
  let segundos = Math.floor(milisegundos / 1000);

  // Calcular minutos y segundos
  let minutos = Math.floor(segundos / 60);
  segundos = segundos % 60;

  return {
    minutos: minutos,
    segundos: segundos,
  };
};

export default Times;
