( function ( DF ) {
  var FeatureCard = {};
  var PREFIX = 'df';
  var NEG_PREFIX = 'no';
  var CLS_FEATURE_ACTIVE = PREFIX + '-feature-active';
  var CLS_FEATURE_INACTIVE = PREFIX + '-feature-inactive';
  var CLS_CARD = PREFIX + '-feature-card';
  var CLS_HEADER = PREFIX + '-feature-card__header';
  var CLS_BODY = PREFIX + '-feature-card__body';
  var CLS_NAME = PREFIX + '-feature-card__name';
  var CLS_DESC = PREFIX + '-feature-card__description';
  var CLS_PROP = PREFIX + '-feature-card__property';

  if ( !DF ) {
    DF = window.DF = {};
  }

  FeatureCard.getNewCard = function createNewFeatureCard( opts ) {
    opts = opts || {};
    this.name = opts.name || null;
    this.desc = opts.desc || null;
    this.prop = opts.prop || null;

    return getNewCardElm( this );
  };

  function getNewCardElm( opts ) {
    opts = opts || {};

    var cardProp = opts.prop || '';
    var parsedProps = cardProp.split( ',' );

    var cardElm = document.createElement( 'div' );
    cardElm.classList.add( CLS_CARD );
    cardElm.setAttribute( 'tabindex', 0 );

    var htmlClassList = document.body.parentNode.classList;

    parsedProps.forEach( function ( prop ) {
      if ( htmlClassList.contains( prop ) ) {
        cardElm.classList.add( CLS_FEATURE_ACTIVE );
        cardElm.classList.remove( CLS_FEATURE_INACTIVE );
      } else if ( htmlClassList.contains( NEG_PREFIX + '-' + prop ) ) {
        cardElm.classList.add( CLS_FEATURE_INACTIVE );
        cardElm.classList.remove( CLS_FEATURE_ACTIVE );
      };
    } );

    var cardHeaderElm = document.createElement( 'div' );
    cardHeaderElm.classList.add( CLS_HEADER );

    var cardBodyElm = document.createElement( 'div' );
    cardBodyElm.classList.add( CLS_BODY );

    var cardNameElm = document.createElement( 'p' );
    cardNameElm.classList.add( CLS_NAME );
    cardNameElm.innerText = opts.name || 'Unnamed';

    var cardDescElm = document.createElement( 'p' );
    cardDescElm.classList.add( CLS_DESC );
    cardDescElm.innerHTML = opts.desc || 'No description';

    var cardPropElm = document.createElement( 'pre' );
    cardPropElm.classList.add( CLS_PROP );
    cardPropElm.innerHTML = [ '<code>', parsedProps.join( '\n' ), '</code>' ].join( '' );

    cardHeaderElm.appendChild( cardNameElm );
    cardBodyElm.appendChild( cardPropElm );
    cardBodyElm.appendChild( cardDescElm );

    cardElm.appendChild( cardHeaderElm );
    cardElm.appendChild( cardBodyElm );

    return cardElm;
  }

  // export
  DF.FeatureCard = FeatureCard;

}( window.DF ) );
