function imprSelec(imprimirdiv)
{
var ficha = document.getElementById(imprimirdiv);
var ventimp = window.open(' ', '_blank');
ventimp.document.write( ficha.innerHTML );
ventimp.document.close();

ventimp.print( );
ventimp.close();
location.reload();
} 