import { StyleSheet } from 'react-native';

// Pesquisar: Styles Components

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8257E5',
        justifyContent: 'center',
        padding: 40
    }, 
    
    banner: {
        width: '100%',
        resizeMode: 'contain', //Redimencionar proporcionalmente
    },

    title: {
        fontFamily: 'Poppins_400Regular',
        color: '#fff',
        fontSize: 20,
        lineHeight: 30,
        marginTop: 80
    },

    titleBold: {
        fontFamily: 'Poppins_600SemiBold'
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'space-between'
    },

    button:{
        height: 150,
        width: '48%',
        borderRadius: 8,
        padding: 24,
        justifyContent: 'space-between'
    },

    buttonPrimary: {
        backgroundColor: '#9871F5',
    },

    buttonText: {
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        fontSize: 20
    },

    buttonSecondary: {
        backgroundColor: '#04D361',
    },

    totalConnections: {
        fontFamily: 'Poppins_400Regular',
        color: '#D4C2FF',
        fontSize: 12,
        lineHeight: 20,
        maxWidth: 140,
        marginTop: 40
    }
});

export default styles;