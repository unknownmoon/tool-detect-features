( function ( DF ) {
  var features;
  var PREFIX = 'df';
  var CLS_FEATURE_ACTIVE = PREFIX + '-feature-active';
  var CLS_FEATURE_INACTIVE = PREFIX + '-feature-inactive';
  var CLS_CARD = PREFIX + '-feature-card';
  var CLS_ACTIVE = PREFIX + '-active';
  var CLS_NAME = PREFIX + '-feature-card__name';

  if ( !DF ) {
    DF = window.DF = {};
  }

  if ( !DF.features ) {
    DF.features = [ ];
  }

  features = DF.features;

  function genCards( ) {
    var i;
    var frag = document.createDocumentFragment( );
    var cards = [ ];

    for ( i = 0; i < features.length; i++ ) {
      cards.push( DF.FeatureCard.getNewCard( features[ i ] ) );
    }

    // active features should go first
    cards.sort( function compareFeatureCard( cardA, cardB ) {
      var classListA = cardA.classList;
      var classListB = cardB.classList;

      if ( classListA.contains( CLS_FEATURE_ACTIVE ) && classListB.contains( CLS_FEATURE_INACTIVE ) ) {
        return -1;
      } else if ( classListA.contains( CLS_FEATURE_INACTIVE ) && classListB.contains( CLS_FEATURE_ACTIVE ) ) {
        return 1;
      } else if ( !classListA.contains( CLS_FEATURE_ACTIVE ) && !classListA.contains( CLS_FEATURE_INACTIVE ) && ( classListB.contains( CLS_FEATURE_ACTIVE ) || classListB.contains( CLS_FEATURE_INACTIVE ) ) ) {
        return 1;
      } else if ( !classListB.contains( CLS_FEATURE_ACTIVE ) && !classListB.contains( CLS_FEATURE_INACTIVE ) && ( classListA.contains( CLS_FEATURE_ACTIVE ) || classListA.contains( CLS_FEATURE_INACTIVE ) ) ) {
        return -1;
      } else {
        return cardA.querySelector( '.' + CLS_NAME )
          .innerText.localeCompare( cardB.querySelector( '.' + CLS_NAME )
            .innerText );
      }
    } );

    for ( i = 0; i < features.length; i++ ) {
      frag.appendChild( cards[ i ] );
    }

    if ( features.length > 0 ) {
      document.body.appendChild( frag );
    }
  }

  function bindEventListeners( ) {
    document.body.addEventListener( 'click', function ( evt ) {
      var i, activeItem;
      var done = false;

      activeItem = document.querySelector( '.' + CLS_ACTIVE );

      for ( i = 0; i < evt.path.length; i++ ) {
        if ( isFeatureCard( evt.path[ i ] ) ) {
          activeItem && activeItem.classList.remove( CLS_ACTIVE );
          evt.path[ i ].classList.add( CLS_ACTIVE );
          done = true;
          break;
        }
      }

      // clicked outside the card, should dismiss the active one
      if ( !done ) {
        activeItem && activeItem.classList.remove( CLS_ACTIVE );
      }
    } );

    window.addEventListener( 'load', genCards );
  }

  function isFeatureCard( elm ) {
    return elm && elm.classList && elm.classList.contains( CLS_CARD ) || false;
  }
  
  bindEventListeners( );

}( window.DF ) );
