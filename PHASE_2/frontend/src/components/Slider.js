import React from 'react';
import { StoreContext } from '../Store';
import { StyledSlider, StyledSliderDark } from './StyledComponents'

function Slider () {
  const { sliderVal, sliderNum, dark } = React.useContext(StoreContext);

  const marks = [
    {
      value: 1,
      label: 'Jan 2020',
    },
    {
      value: 3,
      label: 'Mar 2020',
    },
    {
      value: 6,
      label: 'Jun 2020',
    },
    {
      value: 9,
      label: 'Sep 2020',
    },
    {
      value: 12,
      label: 'Dec 2020',
    },
    {
      value: 15,
      label: 'Mar 2021',
    },
    {
      value: 18,
      label: 'Jun 2021',
    },
    {
      value: 21,
      label: 'Sep 2021',
    },
    {
      value: 24,
      label: 'Dec 2021',
    },
    {
      value: 27,
      label: 'Mar 2022',
    },
    {
      value: 30,
      label: 'Jun 2022',
    },
    {
      value: 33,
      label: 'Sep 2022',
    },
    {
      value: 36,
      label: 'Dec 2022',
    }
  ];

  const updateSlider = (value) => {
    sliderNum.setSliderNum(value)
    switch(value) {
      case 1:
        sliderVal.setSliderVal('01-20');
        break;
      case 2:
        sliderVal.setSliderVal('02-20');
        break;
      case 3:
        sliderVal.setSliderVal('03-20');
        break;
      case 4:
        sliderVal.setSliderVal('04-20');
        break;
      case 5:
        sliderVal.setSliderVal('05-20');
        break;
      case 6:
        sliderVal.setSliderVal('06-20');
        break;
      case 7:
        sliderVal.setSliderVal('07-20');
        break;
      case 8:
        sliderVal.setSliderVal('08-20');
        break;
      case 9:
        sliderVal.setSliderVal('09-20');
        break;
      case 10:
        sliderVal.setSliderVal('10-20');
        break;
      case 11:
        sliderVal.setSliderVal('11-20');
        break;
      case 12:
        sliderVal.setSliderVal('12-20');
        break;
      case 13:
        sliderVal.setSliderVal('01-21');
        break;
      case 14:
        sliderVal.setSliderVal('02-21');
        break;
      case 15:
        sliderVal.setSliderVal('03-21');
        break;
      case 16:
        sliderVal.setSliderVal('04-21');
        break;
      case 17:
        sliderVal.setSliderVal('05-21');
        break;
      case 18:
        sliderVal.setSliderVal('06-21');
        break;
      case 19:
        sliderVal.setSliderVal('07-21');
        break;
      case 20:
        sliderVal.setSliderVal('08-21');
        break;
      case 21:
        sliderVal.setSliderVal('09-21');
        break;
      case 22:
        sliderVal.setSliderVal('10-21');
        break;
      case 23:
        sliderVal.setSliderVal('11-21');
        break;
      case 24:
        sliderVal.setSliderVal('12-21');
        break;
      case 25:
        sliderVal.setSliderVal('01-22');
        break;
      case 26:
        sliderVal.setSliderVal('02-22');
        break;
      case 27:
        sliderVal.setSliderVal('03-22');
        break;
      case 28:
        sliderVal.setSliderVal('04-22');
        break;
      case 29:
        sliderVal.setSliderVal('05-22');
        break;
      case 30:
        sliderVal.setSliderVal('06-22');
        break;
      case 31:
        sliderVal.setSliderVal('07-22');
        break;
      case 32:
        sliderVal.setSliderVal('08-22');
        break;
      case 33:
        sliderVal.setSliderVal('09-22');
        break;
      case 34:
        sliderVal.setSliderVal('10-22');
        break;
      case 35:
        sliderVal.setSliderVal('11-22');
        break;
      default:
        sliderVal.setSliderVal('12-22');
        break;
    }
  };

  if (dark.dark) {
    return (
      <StyledSliderDark
        aria-label="Timeline"
        defaultValue={27}
        step={1}
        marks={marks}
        min={1}
        max={36}
        value={sliderNum.sliderNum}
        onChange={(_, value) => updateSlider(value)}
      />
    );
  } else {
    return (
      <StyledSlider
        aria-label="Timeline"
        defaultValue={27}
        step={1}
        marks={marks}
        min={1}
        max={36}
        value={sliderNum.sliderNum}
        onChange={(_, value) => updateSlider(value)}
      />
    );
  }
}

export default Slider;
