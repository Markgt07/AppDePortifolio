import * as React from 'react';
import {useEffect,useState} from 'react';
import { View, Text,StyleSheet, Image,Dimensions, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView,State,TouchableOpacity} from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StatusBar} from 'expo-status-bar';
import Modal from './Modal.js';
import * as WebBrowser from 'expo-web-browser';
import styleExterno from './Styles';




function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, padding:15 }}>
      <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
        <Text style={styles.textHeader}>Olá, seja bem vindo ao app demonstrativo,para onde deseja navegar?</Text>

        <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.btNavigation}>
          <Ionicons name='md-home' size={29} color='white'/>
          <Text style={{color:'white',marginTop:8,marginLeft:8}}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('Sobre')} style={styles.btNavigation}>
          <Ionicons name='ios-information-circle' size={29} color='white'/>
          <Text style={{color:'white',marginTop:8,marginLeft:8}}>Sobre</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('Portfolio')} style={styles.btNavigation}>
          <Ionicons name='ios-list' size={29} color='white'/>
          <Text style={{color:'white',marginTop:8,marginLeft:8}}>Portfolio</Text>
        </TouchableOpacity>
        

      </ScrollView>
    </View>
  );
}

function SobreScreen({navigation}) {
  const [showModal,setModal] = useState(false);

const abrirModalContato = () => {
  setModal("!showModal");
}


  let widthWindow = Dimensions.get('window').width - 30 - 40;

  return (
    <View style ={{flex:1}}>
    {
      (showModal)?
      <Modal showModal={showModal} setModal={setModal}/>
      :
      <View></View>
    }

      <View style={{ padding:15,flex:1}}>
        <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
          <Text style={styles.textHeader}>Sobre</Text>

        <Image style={{width:widthWindow,height:widthWindow, marginTop:20}} source={require('./resources/poro.jpg')}/>
        <View>
            <Text style={{paddingTop:15,fontSize:15,textAlign:'center'}}>
              Trabalho de programação mobile.{"\n"}Realizado pelos alunos do sexto periodo do curso de Sistemas de informação:{"\n"}
              Marcelo Fabio{"\n"}Mafisa{"\n"}Felipe{"\n"}Michel{"\n"}Sebastião
          </Text>
          <Text style={{paddingTop:10}}>
            Trabalho feito com as tecnologias:{"\n"} React Native, Firebase, Android Studio e expo{"\n"}Com as blibliotecas:{"\n"}Ion icons, React navigation
          </Text>
          <TouchableOpacity onPress={()=>abrirModalContato()} style={{...styles.btNavigation,justifyContent:'center'}}>
            <Text style={{color:'white',textAlign:'center',fontSize:17}}>
              Entrar em contato
            </Text>
          </TouchableOpacity>
        </View>

        </ScrollView>
      </View>
    </View>

  );
}

function PortfolioScreen({navigation,route}) {

  const[images,setImages] = useState([
    {
      img: require('./resources/img1.png'),
      width:0,
      height:0,
      ratio:0,
      website:'https://www.google.com/imgres?imgurl=https%3A%2F%2Ffredericolopes.com%2Fwp-content%2Fuploads%2F2017%2F11%2Fweb-design-1.png&imgrefurl=https%3A%2F%2Ffredericolopes.com%2Fweb-design%2F&tbnid=TPPE4b6c1IPjDM&vet=12ahUKEwjr7ILMzILxAhVsu5UCHZXQCYwQMygBegUIARC3AQ..i&docid=hImufiMSvEK0pM&w=1705&h=1224&q=design%20de%20sites&ved=2ahUKEwjr7ILMzILxAhVsu5UCHZXQCYwQMygBegUIARC3AQ'
    },
    {
      img: require('./resources/img2.jpg'),
      width:0,
      height:0,
      ratio:0,
      website:'https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic-cse.canva.com%2Fblob%2F183069%2F2-designers-brasileiros.png&imgrefurl=https%3A%2F%2Fwww.canva.com%2Fpt_br%2Faprenda%2F10-sites-brasileiros-de-design-para-seguir%2F&tbnid=FYafQZAe2jrB4M&vet=12ahUKEwjr7ILMzILxAhVsu5UCHZXQCYwQMygCegUIARC5AQ..i&docid=ebN-bsSjabaryM&w=2780&h=1682&q=design%20de%20sites&ved=2ahUKEwjr7ILMzILxAhVsu5UCHZXQCYwQMygCegUIARC5AQ'
    }
  ])

  const [windowWidth,setWindowWidth] = useState(0);

  useEffect (() =>{
      let windowWidthN = Dimensions.get('window').width;
      setWindowWidth(windowWidthN - 30 - 40);
      let newImages = images.filter(function(val){
        let w = Image.resolveAssetSource(val.img).width;
        let h = Image.resolveAssetSource(val.img).height;

        val.width = w;
        val.height = h;

        val.ratio = h/w;

        return val;

      })
      setImages(newImages);

  }, [])

  const abrirNavegador = async (website) =>{
    let result = await WebBrowser.openBrowserAsync(website);
  }


  return (
    <View style={{ flex: 1,padding:15 }}>
      <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
        <Text style={styles.textHeader}>Ultimos projetos</Text>

        {
          images.map(function(val){
            return(
              <View style={styles.parentImage}>
                <Image 
                style={{width:windowWidth,height:windowWidth*val.ratio,resizeMode:'stretch'}} source={val.img}/>
                <TouchableOpacity onPress={()=>abrirNavegador(val.website)} style={styles.botaoAbrirNavegador}><Text style={{textAlign:'center',color:'white',fontSize:18}}>Abrir no navegador</Text></TouchableOpacity>

              </View>
            )
          })
        }




      </ScrollView>
    </View>
  );
}


function AccontScreen({navigation}) {
  return (
    <View style={{ flex: 1, padding:15 }}>
      
      <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
        <Text style={styles.textHeader}>Olá, seja bem vindo ao app demonstrativo,para onde deseja navegar?</Text>

        <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={styles.btNavigation}>
          <Ionicons name='ios-cube' size={29} color='white'/>
          <Text style={{color:'white',marginTop:8,marginLeft:8}}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('')} style={styles.btNavigation}>
          <Ionicons name='ios-construct' size={29} color='white'/>
          <Text style={{color:'white',marginTop:8,marginLeft:8}}>Configuração</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('')} style={styles.btNavigation}>
          <Ionicons name='md-build' size={29} color='white'/>
          <Text style={{color:'white',marginTop:8,marginLeft:8}}>Segurança</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('')} style={styles.btNavigation}>
          <Ionicons name='ios-notifications' size={29} color='white'/>
          <Text style={{color:'white',marginTop:8,marginLeft:8}}>Notificação</Text>
        </TouchableOpacity>
        

      </ScrollView>
    </View>
  );
}

  function CadastroScreen(navigation) {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [User, setUser] = useState('');

    
    const login = () => {
      
    }
    
    return (
      <View style={styleExterno.container}>
          <StatusBar hidden />

        
          
          <TextInput placeholder="Seu e-mail..." style={styleExterno.textInput} onChangeText={text=>setEmail(text)} />
          <TextInput secureTextEntry={true} placeholder="Sua senha..." style={styleExterno.textInput} onChangeText={text=>setSenha(text)} />
      
          <TouchableOpacity style={styleExterno.btnCadastro} onPress={()=>login()}>
            <Text style={{color:'white',textAlign:'center'}}>LOGIN</Text>
          </TouchableOpacity>

      </View>
    );
  }


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden/>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home';
            } else if (route.name === 'Portfolio') {
              iconName = focused ? 'ios-list' : 'ios-list';
            }else if (route.name === 'Sobre') {
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle';
            }
            else if (route.name === 'Conta') {
              iconName = focused ? 'ios-cube' : 'ios-cube';
            }
            else if (route.name === 'Login') {
              iconName = focused ? 'md-albums' : 'md-albums';
            }
            
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'purple',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Sobre" component={SobreScreen} />
        <Tab.Screen name="Portfolio" component={PortfolioScreen} />
        <Tab.Screen name="Conta" component={AccontScreen} />
        <Tab.Screen name="Login" component={CadastroScreen} />
        
      </Tab.Navigator>
    </NavigationContainer>
    
    
  );
}
  
export default App;

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white'
  },
  textHeader:{
    color:'purple',
    fontSize:20,
    textAlign:'center'
  },
  btNavigation:{
    backgroundColor:'purple',
    padding:20,
    marginTop:15,
    flexDirection: 'row'
  },
  parentImage:{
    marginTop:30
  },
  botaoAbrirNavegador:{
    padding:10,
    backgroundColor:'purple',
  },
  modalParent:{
    position:'absolute',
    left:0,
    top:0,
    width: '100%',
    height:'100%',
    backgroundColor:'rgba(0,0,0,0.6)',
    zIndex:1
  },
  boxModal:{
    backgroundColor:'white',
    height:370,
    width:'100%',
    position:'absolute',
    left:0,
    top:'50%',
    marginTop:-185,
    padding:10
  }

})