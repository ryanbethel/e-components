export function get(req) {
    const medals = [
      {
        label: 'USA',
        values: [46, 37, 38],
      },
      {
        label: 'GBR',
        values: [27, 23, 17],
      },
      {
        label: 'CHN',
        values: [26, 18, 26],
      },
    ]

    return { json: { chartData: { medals } } }
}
