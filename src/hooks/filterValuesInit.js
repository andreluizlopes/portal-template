const filterValuesInit = {
  price: {
    label: 'PREÇO',
    values: {
      price1: { label: 'Até R$ 100,00', range: [0, 100], status: false },
      price2: { label: 'De R$ 101,00 até R$ 200,00', range: [101, 200], status: false },
      price3: { label: 'De R$ 201,00 até R$ 500,00', range: [201, 500], status: false },
      price4: { label: 'Acima de R$ 501,00', range: [501, Infinity], status: false }
    }
  },
  speed: {
    label: 'VELOCIDADE',
    values: {
      speed1: { label: 'Até 100 MB', range: [0, 100], status: false },
      speed2: { label: 'De 101 MB até 200 MB', range: [101, 200], status: false },
      speed3: { label: 'De 201 MB até 500 MB', range: [201, 500], status: false },
      speed4: { label: 'Acima de 500 MB', range: [501, Infinity], status: false }
    }
  },
  provider: {
    label: 'OPERADORA',
    values: {
      provider1: { label: 'Claro', status: false },
      provider2: { label: 'Gvt', status: false },
      provider3: { label: 'Hughesnet', status: false },
      provider4: { label: 'Net', status: false },
      provider5: { label: 'Nextel', status: false },
      provider6: { label: 'Oi', status: false },
      provider7: { label: 'Sky', status: false },
      provider8: { label: 'Tim', status: false },
      provider9: { label: 'Vivo', status: false }
    }
  }
}

export default filterValuesInit
