( function ( DF ) {
  var features;
  var PREFIX = 'df';
  var CLS_FEATURE_ACTIVE = PREFIX + '-feature-active';
  var CLS_FEATURE_INACTIVE = PREFIX + '-feature-inactive';
  var CLS_CARD = PREFIX + '-feature-card';
  var CLS_ACTIVE = PREFIX + '-active';
  var CLS_NAME = PREFIX + '-feature-card__name';
  var CLS_FEATURE_SECTION = PREFIX + '-feature-section';
  var CLS_FEATURE_STATICS_NOT_READY = PREFIX + '-feature-statics--not-ready';
  var CLS_FEATURE_STATICS_AVAILABLE_COUNT = PREFIX + '-feature-statics__available-count';
  var CLS_FEATURE_STATICS_UNAVAILABLE_COUNT = PREFIX + '-feature-statics__unavailable-count';
  var CLS_FEATURE_STATICS_UNDETECTABLE_COUNT = PREFIX + '-feature-statics__undetectable-count';

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
      var featuresSectionElm = document.createElement( 'section' );

      featuresSectionElm.classList.add( CLS_FEATURE_SECTION );
      featuresSectionElm.appendChild( frag );
      document.body.appendChild( featuresSectionElm );

      updateStatics( );
    }
  }

  function updateStatics( ) {
    var items = document.querySelectorAll( '.' + CLS_CARD );
    var unavailableItems = document.querySelectorAll( '.' + CLS_CARD + '.' + CLS_FEATURE_INACTIVE );
    var availableItems = document.querySelectorAll( '.' + CLS_CARD + '.' + CLS_FEATURE_ACTIVE );
    var undetectableItems = document.querySelectorAll( '.' + CLS_CARD + ':not(.' + CLS_FEATURE_ACTIVE + ')' + ':not(.' + CLS_FEATURE_INACTIVE + ')' );

    document.querySelector( '.' + CLS_FEATURE_STATICS_AVAILABLE_COUNT )
      .innerText = availableItems.length + ' / ' + items.length;

    document.querySelector( '.' + CLS_FEATURE_STATICS_UNAVAILABLE_COUNT )
      .innerText = unavailableItems.length + ' / ' + items.length;

    document.querySelector( '.' + CLS_FEATURE_STATICS_UNDETECTABLE_COUNT )
      .innerText = undetectableItems.length + ' / ' + items.length;

    document.querySelector( '.' + CLS_FEATURE_STATICS_NOT_READY )
      .classList.remove( CLS_FEATURE_STATICS_NOT_READY );
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
