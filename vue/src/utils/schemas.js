export const landingSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'Nautiks',
      url: 'https://nautiks.app',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate:
            'https://nautiks.app/search?port={port_id}&boat={boat_id}&start={start_date}&end={end_date}',
        },
        'query-input': 'required name=search_term',
      },
    },
    {
      '@type': 'Organization',
      name: 'Nautiks Solutions',
      url: 'https://nautiks.app',
      logo: 'https://nautiks.app/logo.png',
    },
    {
      '@type': 'ItemList',
      name: 'Puertos destacados',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'Place',
            name: 'Port d’Andratx',
            url: 'https://nautiks.app/port/10',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'Place',
            name: 'Porto Colom',
            url: 'https://nautiks.app/port/9',
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'Place',
            name: 'Marina Cala D’Or',
            url: 'https://nautiks.app/port/11',
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'Place',
            name: 'Port Adriano',
            url: 'https://nautiks.app/port/12',
          },
        },
      ],
    },
  ],
}