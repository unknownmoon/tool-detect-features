var rows = document.querySelectorAll( '#features + table > tbody tr' );
var featureData = [ ];

rows.forEach( function ( row, idx, rows ) {
  var data = processRow( row, idx, rows );
  if ( data.name ) {
    featureData.push( data );
  }
} );

// console.log( featureData );

console.log( JSON.stringify( featureData ) );

function processRow( row, idx, rows ) {
  var rowData = {
    name: '',
    desc: '',
    prop: ''
  };
  var nextRowIdx = idx + 1;

  if ( nextRowIdx < rows.length ) {
    processDescRow( rows[ nextRowIdx ], rowData );
  }

  processPrimaryRow( row, rowData );

  return rowData;
}

function processPrimaryRow( row, rowData ) {
  var nameCellElm = null;
  var propCellElm = null;

  // skip the description row
  if ( row.querySelectorAll( '[colspan="2"]' )
    .length > 0 ) {
    return;
  }

  if ( row.childNodes.length > 1 ) {
    nameCellElm = row.childNodes[ 0 ];
    propCellElm = row.childNodes[ 1 ];
  } else if ( row.childNodes.length === 1 ) {
    nameCellElm = row.childNodes[ 0 ];
  }

  if ( nameCellElm ) {
    rowData.name = nameCellElm.innerText;
  }

  if ( propCellElm ) {
    propCellElm.querySelectorAll( 'b' )
      .forEach( function ( item, idx, items ) {
        var data = item.innerHTML;
        if ( data ) {
          rowData.prop += data;
        }
      } );
  }
}

function processDescRow( row, rowData ) {

  row.querySelectorAll( '[colspan="2"] > p' )
    .forEach( function ( cell, idx, cells ) {
      var data = cell.innerHTML;
      if ( data ) {
        rowData.desc += data;
      }
    } );
}
