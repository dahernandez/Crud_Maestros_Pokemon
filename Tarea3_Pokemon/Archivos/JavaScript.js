var switch_nuevo_cancelar = 0;
var entrenadores = [];
var pokemones;
var experiencia;
var posicion_modificar;
$(document).ready(function() {
  if(JSON.parse(localStorage.getItem('data_tarea3'))!=null){
  entrenadores = JSON.parse(localStorage.getItem('data_tarea3'));
}
  $("#btn_guardar").attr('disabled', true);
  $("#btn_modificar").attr('disabled', true);
  update_pokemon_table();
  update_master_table();

  $("#btn_nuevo").click(function(event) {
    if (switch_nuevo_cancelar==0) {
      nuevo_registro();
    }else{
      cancelar_registro();
    }
  });

  $("#btn_guardar").click(function(event) {
    var cedula = $("#txt_cedula").val();
    var nombre = $("#txt_nombre").val();
    var apellido = $("#txt_apellido").val();
    var exp = $("#txt_exp").val();
    var maestro = new Entrenadores(cedula,nombre,apellido,exp,pokemones);
    if(cedula!=''& nombre!='' & apellido!=''){
      entrenadores.push(maestro);
      console.log(entrenadores);
      clear_todo();
      update_master_table();
    }
    else{
    alert("Debe completar todos los datos.");
    }
  });
  $("#btn_modificar").click(function(event) {
    modificar_maestro();
  });
});

function modificar_maestro(){
  var cedula = $("#txt_cedula").val();
  var nombre = $("#txt_nombre").val();
  var apellido = $("#txt_apellido").val();
  var exp = $("#txt_exp").val();
  var maestro = new entrenadores(cedula,nombre,apellido,exp,pokemones);
    delete entrenadores[posicion_modificar];
    entrenadores[posicion_modificar] = maestro;
    console.log(entrenadores);
    $("#btn_nuevo").attr('disabled', false);
    $("#btn_modificar").attr('disabled', true);
    clear_todo();
    update_master_table();
}
function editar_maestro(posicion){
  var maestro = entrenadores[posicion];
  $("#txt_cedula").attr('disabled', false);
  $("#txt_nombre").attr('disabled', false);
  $("#txt_apellido").attr('disabled', false);
  $("#btn_guardar").attr('disabled', true);
  $("#btn_nuevo").attr('disabled', true);
  $("#btn_modificar").attr('disabled', false);

  $("#txt_cedula").val(maestro.cedula);
  $("#txt_nombre").val(maestro.nombre);
  $("#txt_apellido").val(maestro.apellido);
  $("#div_data").show();
  pokemones = maestro.pokemons;
  update_pokemon_table();
  posicion_modificar = posicion;
}

function myDeleteFunction(position) {
  if(confirm("Seguro que deseas eliminar este entrenador?")){
    document.getElementById("tbodyMaster").deleteRow(position);
    localStorage.clear();
  }
}


function update_master_table(){
  console.log(entrenadores);
  $("#tbodyMaster tr").remove();
  var count = 0;
    var tbody = $('#tableMaster tbody'),
        props = ["cedula", "nombre", "apellido","exp"];
    $.each(entrenadores, function(i, entrenadores) {
      var tr = $('<tr>');
      $.each(props, function(i, prop) {
        $('<td>').html(entrenadores[prop]).appendTo(tr);
      });
      $('<td>').html(entrenadores["pokemons"].length).appendTo(tr);
    $('<td style="width: 83px;">').html('<button><a style="padding-left:8px; color:rgb(54, 106, 199); text-decoration:none; padding-right:8px;" href="#" onClick="editar_maestro('+count+')">Editar</a>').appendTo(tr);
    $('<td style="width: 93px;">').html('<button><a style="padding-left:5px; color:rgb(255, 0, 0); text-decoration:none; padding-right:5px;" href="#" onClick="myDeleteFunction(this.parentNode.parentNode.rowIndex)">Eliminar</a>').appendTo(tr); 
      tbody.append(tr);
  count++;
  });
  localStorage.setItem('data_tarea3',JSON.stringify(entrenadores));
}

function get_master_exp(){
  experiencia = 0;
  $.each(pokemones, function(i, pokemones) {
    experiencia += parseInt(pokemones["exp"]);
  });
  return experiencia;
}
function agregar(){
  var pokemon_nombre = $("#txt_nombre_pokemon").val();
  var pokemon_nivel = $("#txt_nivel_pokemon").val();
  var pokemon_exp = $("#txt_exp_pokemon").val();

  if(pokemon_nombre!=''& pokemon_nivel!='' & pokemon_exp!=''){
  var pokemon = new Pokemones(pokemon_nombre,pokemon_nivel,pokemon_exp);
  pokemones.push(pokemon);
  clear_pokemon_text();
  update_pokemon_table();
  console.log(pokemones);
  console.log(experiencia);
  }
  else{
    alert("Debe completar todos los datos.");
  }
}
function borrar_pokemon(posicion){
  pokemones.splice(posicion,1);
  update_pokemon_table();
}
function update_pokemon_table(){
  $("#tbody tr").remove();
  $("#txt_exp").val(get_master_exp);
  var count = 0;

    var tbody = $('#table tbody'),
        props = ["nombre", "nivel", "exp"];
    $.each(pokemones, function(i, pokemones) {
      var tr = $('<tr>');
      $.each(props, function(i, prop) {
        $('<td>').html(pokemones[prop]).appendTo(tr);
      });
  	$('<td>').html('<a style="padding-left:5px; padding-right:5px;" href="#" onClick="borrar_pokemon('+count+')"><input name="boton1" type="image" src="http://www.iconsdb.com/icons/preview/soylent-red/x-mark-xl.png" style="width: 23px;"></a>').appendTo(tr);
      tbody.append(tr);
  count++;
  });
  var tr = $('<tr>');
  $('<td>').html('<input type="text" class="form-control" id="txt_nombre_pokemon">').appendTo(tr);
  $('<td>').html('<input type="number" class="form-control" id="txt_nivel_pokemon">').appendTo(tr);
  $('<td>').html('<input type="number" class="form-control" id="txt_exp_pokemon">').appendTo(tr);
  $('<td>').html('<input type="button" class="btn" value="Agregar" id="btn_agregar" onClick="agregar()">').appendTo(tr);
  tbody.append(tr);
}
function clear_pokemon_text(){
  $("#txt_nombre_pokemon").val();
  $("#txt_nivel_pokemon").val();
  $("#txt_exp_pokemon").val();
}
function nuevo_registro(){
  $("#txt_cedula").attr('disabled', false);
  $("#txt_nombre").attr('disabled', false);
  $("#txt_apellido").attr('disabled', false);
  $("#btn_guardar").attr('disabled', false);
  $("#btn_nuevo").html("Cancelar");
  $("#div_data").show();
  experiencia = 0;
  pokemones = [];
  switch_nuevo_cancelar = 1;
}
function cancelar_registro(){
  $("#txt_cedula").attr('disabled', true);
  $("#txt_nombre").attr('disabled', true);
  $("#txt_apellido").attr('disabled', true);
  $("#btn_nuevo").html("Nuevo");
  $("#btn_guardar").attr('disabled', true);
  experiencia = 0;
  pokemones = [];
  update_pokemon_table();
  clear_pokemon_text();
  switch_nuevo_cancelar = 0;
}
function clear_todo(){
  cancelar_registro();
  $("#txt_cedula").val("");
  $("#txt_nombre").val("");
  $("#txt_apellido").val("");
}
function Entrenadores(cedula,nombre,apellido,exp,pokemons){
  this.cedula=cedula;
  this.nombre=nombre;
  this.apellido=apellido;
  this.exp=exp;
  this.pokemons=pokemons;
}
function Pokemones(nombre,nivel,exp){
  this.nombre=nombre;
  this.nivel=nivel;
  this.exp=exp;
}
