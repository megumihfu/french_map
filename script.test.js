const d3 = {
    select: jest.fn(() => ({
      attr: jest.fn().mockReturnThis(),
      selectAll: jest.fn().mockReturnThis(),
      // Continue to chain any other methods you use like append, data, enter, etc.
      append: jest.fn().mockReturnThis(),
      data: jest.fn().mockReturnThis(),
      enter: jest.fn().mockReturnThis(),
      on: jest.fn().mockReturnThis(),
      // ... and so on for all methods you use in your d3 calls
    })),
  };

  // Mocking global d3 object
  global.d3 = d3;


const { convertCoordinates, calculateDistance } = require('./client/pages/script'); // Assurez-vous que le chemin d'accès est correct

describe('Script Functions', () => {
  test('convertCoordinates should return correct pixel values', () => {
    const width = 995;
    const height = 960;
    const longitude = 2.3522; // Longitude pour Paris
    const latitude = 48.8566; // Latitude pour Paris

    const coordinates = convertCoordinates(longitude, latitude, width, height);

    expect(coordinates).toHaveProperty('x');
    expect(coordinates).toHaveProperty('y');
    // Ajoutez des vérifications supplémentaires sur les valeurs de x et y si nécessaire
  });
  test('calculateDistance should return a finite number', () => {
    const distance = calculateDistance(48.8566, 2.3522, 34.0522, -118.2437); // From Paris to Los Angeles
    const distanceNum = parseFloat(distance);
    expect(distance).not.toBeNull();
    expect(distanceNum).toBeGreaterThan(0);
    expect(distance).toMatch(/^\d+(\.\d{1,2})?$/); // Checks if the distance format is correct (number with two decimals)
  });


});
