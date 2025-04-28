import { StyleSheet } from 'react-native';

export const homestyles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      padding: 20,
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export const greetingStyles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    hello: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    message: {
        fontSize: 16,
        color: '#555',
    },
});

export const suggestedTrackCardStyles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginVertical: 12,
        marginHorizontal: 16,
        overflow: 'hidden',
        elevation: 3,
    },
    image: {
        width: 100,
        height: 100,
    },
    info: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    artist: {
        fontSize: 14,
        color: '#555',
        marginVertical: 4,
    },
    button: {
        backgroundColor: '#1DB954',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 24,
        alignSelf: 'flex-start',
        marginTop: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export const musicCarouselStyles = StyleSheet.create({
    container: {
        marginTop: 16,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    list: {
        gap: 12,
    },
});

export const searchBarStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 12,
        paddingHorizontal: 12,
        borderRadius: 12,
        backgroundColor: '#f2f2f2',
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    icon: {
        paddingLeft: 8,
    },
});

export const miniPlayerStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#333',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
    },
    infoContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    trackName: {
        fontSize: 16,
        color: '#fff',
    },
    artistName: {
        fontSize: 12,
        color: '#bbb',
    },
    controlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    controlButton: {
        padding: 10,
    },
    progressBar: {
        flex: 1,
        marginLeft: 10,
    },
});

export const footerStyles = StyleSheet.create({
    footerContainer: {
        backgroundColor: '#222',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        position: 'absolute',
        width: '100%',
    },
    footerText: {
        color: '#fff',
        fontSize: 14,
    },
    linksContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    footerLink: {
        color: '#1E90FF',
        fontSize: 14,
        marginHorizontal: 15,
    },
});

export const navbarstyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#333',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export const musiccardstyles = StyleSheet.create({
    card: {
      width: 140,
      margin: 10,
      borderRadius: 16,
      backgroundColor: '#1e1e1e', 
      overflow: 'hidden',
      elevation: 5,
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      alignItems: 'center',
    },
    cover: {
      width: '100%',
      height: 140,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    title: {
      marginTop: 8,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#ffffff',
      textAlign: 'center',
      paddingHorizontal: 6,
    },
    artist: {
      marginTop: 4,
      fontSize: 13,
      color: '#bbbbbb',
      textAlign: 'center',
      paddingHorizontal: 6,
      marginBottom: 8,
    },
});

