import React from 'react'
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const Filter = () => {
  const [districts, setDistricts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = require('../../districts.json');
        setDistricts(data);
      } catch (error) {
        console.error('Error fetching the file:', error);
      }
    };
 
    if (districts.length === 0) fetchData();
    
  }, [districts]);

  const handleDistrictSelect = (selectedDistrict) => {
    setIsDistrict(selectedDistrict !== '');
    setDistrict(selectedDistrict);
  };


  const data=districts.map((val,i)=>{
    return {'label':val.district,'value':i}
})

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };
  return (
    <Dropdown
    style={styles.dropdown}
    placeholderStyle={styles.placeholderStyle}
    selectedTextStyle={styles.selectedTextStyle}
    inputSearchStyle={styles.inputSearchStyle}
    iconStyle={styles.iconStyle}
    data={data}
    search
    maxHeight={300}
    labelField="label"
    valueField="value"
    placeholder="Select District"
    searchPlaceholder="Search..."
    value={value}
    onChange={item => {
      setValue(item.value);
    }}
   /*  renderLeftIcon={() => (
      <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
    )} */
    renderItem={renderItem}
  />
  )
}

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },})

export default Filter