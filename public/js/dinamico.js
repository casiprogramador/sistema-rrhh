/*$(document).ready(function() {
var iCnt = 0;
 
// Crear un elemento div añadiendo estilos CSS
var container = $(document.createElement('div')).css({
padding: '5px', margin: '20px', width: '1600px', border: '0px dashed',
borderTopColor: '#999', borderBottomColor: '#999',
borderLeftColor: '#999', borderRightColor: '#999'
});
 
$('#btAdd').click(function() {
if (iCnt <= 19) {
 
iCnt = iCnt + 1;
 
// Añadir caja de texto.

$(container).append('<input type=text class="input" id=tb' + iCnt + ' ' +
'value="Elemento de Texto ' + iCnt + '" />');

//$(container).append('<div class="col"><div class="form-group"><label for="name">Nombres y Apellidos</label><input type="text" class="form-control" id="nomapellidos" placeholder="Nombres y Apellidos"></div></div></div><div class="row"><div class="col"><div class="form-group"><label for="name">Sexo</label><div class="form-radio"><label class="form-check-label"><input type="radio" class="form-check-input" name="optionsRadios" id="sexodependientem" value="M" checked>Masculino</label></div><div class="form-radio"><label class="form-check-label"><input type="radio" class="form-check-input" name="optionsRadios" id="sexodependientef" value="F">Femenino</label></div></div></div></div><div class="row"><div class="col"><div class="form-group"><label for="address">Fecha de Nacimiento</label><input name="address" id="fecnacdependiente" rows="6" class="form-control" placeholder="Fecha de Nacimiento"></div></div><div class="col"><div class="form-group"><label for="address">N° de Documento de Identificacion</label><input name="address" id="Nrodidependiente" rows="6" class="form-control" placeholder="N° de Documento de Identificacion"></div></div></div><div class="row"><div class="col"><div class="form-group"><label for="name">Tipo de Documento de Respaldo de la Relacion de Dependencia</label><input type="text" class="form-control" id="respaldodependencia" placeholder="Tipo de Documento de la Relacion de Dependencia"></div></div><div class="col"><div class="form-group"><label for="address">N° De Documento de la Relacion de Dependencia</label><input name="address" id="nrodocdependencia" rows="6" class="form-control" placeholder="N° Identificacion Personal"></div></div></div>');
 
if (iCnt == 1) {
 
var divSubmit = $(document.createElement('div'));
$(divSubmit).append('<input type=button class="bt" onclick="GetTextValue()"' +
'id=btSubmit value=Enviar />');
 
}
 
$('#main').after(container, divSubmit);
}
else { //se establece un limite para añadir elementos, 20 es el limite
 
$(container).append('<label>Limite Alcanzado</label>');
$('#btAdd').attr('class', 'bt-disable');
$('#btAdd').attr('disabled', 'disabled');
 
}
});
 
$('#btRemove').click(function() { // Elimina un elemento por click
if (iCnt != 0) { $('#tb' + iCnt).remove(); iCnt = iCnt - 1; }
 
if (iCnt == 0) { $(container).empty();
 
$(container).remove();
$('#btSubmit').remove();
$('#btAdd').removeAttr('disabled');
$('#btAdd').attr('class', 'bt')
 
}
});
 
$('#btRemoveAll').click(function() { // Elimina todos los elementos del contenedor
 
$(container).empty();
$(container).remove();
$('#btSubmit').remove(); iCnt = 0;
$('#btAdd').removeAttr('disabled');
$('#btAdd').attr('class', 'bt');
 
});
});
 
// Obtiene los valores de los textbox al dar click en el boton "Enviar"
var divValue, values = '';
 
function GetTextValue() {
 
$(divValue).empty();
$(divValue).remove(); values = '';
 
$('.input').each(function() {
divValue = $(document.createElement('div')).css({
padding:'5px', width:'200px'
});
values += this.value + '<br />'
});
 
$(divValue).append('<p><b>Tus valores añadidos</b></p>' + values);
$('body').append(divValue);
 
}*/

$(document).ready(function(){
    var maxField = 50; //Input fields increment limitation
    var addButton = $('.add_button'); //Add button selector
    var wrapper = $('.field_wrapper'); //Input field wrapper
    //var fieldHTML = '<div><input type="text" name="field_name[]" value=""/><input type="text" name="field_name[]" value=""/><input type="text" name="field_name[]" value=""/><input type="text" name="field_name[]" value=""/><button href="javascript:void(0);" class="remove_button" title="Remove field">remover</button></div>'; //New input field html 
    var fieldHTML = '<div><div><div class="row"><div class="col"><div class="form-group"><label for="name">Nombres y Apellidos</label><input type="text" class="form-control" id="nomapellidos" placeholder="Nombres y Apellidos"></div></div></div><div class="row"><div class="col"><div class="form-group"><label for="name">Sexo</label><div class="form-radio"><label class="form-check-label"><input type="radio" class="form-check-input" name="optionsRadios" id="sexodependientem" value="M" checked>Masculino</label></div><div class="form-radio"><label class="form-check-label"><input type="radio" class="form-check-input" name="optionsRadios" id="sexodependientef" value="F">Femenino</label></div></div></div></div><div class="row"><div class="col"><div class="form-group"><label for="address">Fecha de Nacimiento</label><div class="input-group date datepicker b-l-blue"><input type="text" class="form-control"><div class="input-group-addon"><span class="mdi mdi-calendar-blank"></span></div></div></div></div><div class="col"><div class="form-group"><label for="address">N° de Documento de Identificacion</label><input name="address" id="Nrodidependiente" rows="6" class="form-control" placeholder="N° de Documento de Identificacion"></div></div></div><div class="row"><div class="col"><div class="form-group"><label for="name">Tipo de Documento de Respaldo de la Relacion de Dependencia</label><select class="js-example-basic-single" style="width:100%"><option value="matr">Certificado de Matrimonio</option><option value="librfam">Libreta Familiar</option><option value="certnac">Certificado de Nacimiento</option><option value="otros">Otros</option></select></div></div><div class="col"><div class="form-group"><label for="address">N° De Documento de la Relacion de Dependencia</label><input name="address" id="nrodocdependencia" rows="6" class="form-control" placeholder="N° Identificacion Personal"></div></div></div></div><button href="javascript:void(0);" class="remove_button" title="Remove field">remover</button></div>'; //New input field html 
    var x = 1; //Initial field counter is 1
    $(addButton).click(function(){ //Once add button is clicked
        if(x < maxField){ //Check maximum number of input fields
            x++; //Increment field counter
            $(wrapper).append(fieldHTML); // Add field html
        }
    });
    $(wrapper).on('click', '.remove_button', function(e){ //Once remove button is clicked
        e.preventDefault();
        $(this).parent('div').remove(); //Remove field html
        x--; //Decrement field counter
    });
});

