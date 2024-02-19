const d3 = {
    select: jest.fn(() => ({
      attr: jest.fn().mockReturnThis(),
      selectAll: jest.fn().mockReturnThis(),
      append: jest.fn().mockReturnThis(),
      data: jest.fn().mockReturnThis(),
      enter: jest.fn().mockReturnThis(),
      on: jest.fn().mockReturnThis(),
    })),
  };

  global.d3 = d3;


const { convertCoordinates, calculateDistance } = require('../client/pages/script'); 

describe('Script Functions', () => {
  test('convertCoordinates should return correct pixel values', () => {
    const width = 995;
    const height = 960;
    const longitude = 2.3522; // Longitude Paris
    const latitude = 48.8566; // Latitude Paris

    const coordinates = convertCoordinates(longitude, latitude, width, height);

    expect(coordinates).toHaveProperty('x');
    expect(coordinates).toHaveProperty('y');
  });
  test('calculateDistance should return a finite number', () => {
    const distance = calculateDistance(48.8566, 2.3522, 34.0522, -118.2437); 
    const distanceNum = parseFloat(distance);
    expect(distance).not.toBeNull();
    expect(distanceNum).toBeGreaterThan(0);
    expect(distance).toMatch(/^\d+(\.\d{1,2})?$/); 
  });


});