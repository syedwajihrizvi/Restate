import { Avatars, Account, Client, OAuthProvider, Databases, Query } from 'react-native-appwrite'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'
import { Alert } from 'react-native'

export const config = {
    platform: 'com.syed.restate',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABSE_ID,
    agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
    galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID
}

export const client = new Client()

client.setEndpoint(config.endpoint!)
      .setPlatform(config.platform!)
      .setProject(config.projectId!)

export const avatar = new Avatars(client)
export const account = new Account(client)
export const databases = new Databases(client)

export async function login() {
    try {
        const redirecttUrl = Linking.createURL('/')
        const response = await account.createOAuth2Token(OAuthProvider.Google, redirecttUrl)
        if (!response) throw new Error("Authorization for Google login failed")

        const browserResult = await WebBrowser.openAuthSessionAsync(response.toString(), redirecttUrl)

        if (browserResult.type != 'success') throw new Error('Failed to Login.')

        const browserUrl = new URL(browserResult.url)

        const secret = browserUrl.searchParams.get('secret')?.toString()
        const userId = browserUrl.searchParams.get('userId')?.toString()

        if (!secret || !userId) throw new Error('Failed to Login!')
        
        const session = await account.createSession(userId, secret)
        if (!session) throw new Error('Failed to Login!')
        
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

export async function logout() {
    try {
        const result = await account.deleteSession('current')
        if (result)
            return true
        if (!result) throw new Error("Failed to logout user.")
    } catch (error) {
        console.log(error)
        return false
    }
}

export async function getCurrentUser() {
    try {
        const user = await account.get()
        if (user.$id) {
            const userAvatar = avatar.getInitials(user.name)

            return {
                ...user, avatar: userAvatar.toString()
            }
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

export async function getLatestProperties() {
    try {
        const result = await databases.listDocuments(
                        config.databaseId!, 
                        config.propertiesCollectionId!,
                        [Query.orderAsc('$createdAt'), Query.limit(5)]
                        )
        return result.documents
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function getProperties(
    {filter, query, limit}: {filter: string, query: string, limit?: number}) {
        try {
            const buildQuery = [Query.orderAsc('$createdAt')]

            if (filter && filter != 'All') {
                buildQuery.push(Query.equal('type', [filter]))
            }

            if (query) {
                buildQuery.push(Query.or([
                    Query.search('name', query),
                    Query.search('description', query),
                    Query.search('address', query),
                    Query.search('type', query),
                    Query.contains('facilities', query)
                ]))
            }

            if (limit) buildQuery.push(Query.limit(limit))
            
            const result = await databases.listDocuments(
                config.databaseId!, config.propertiesCollectionId!, buildQuery)
            return result.documents
        } catch (error) {
            console.error(error)
            return []           
        }
}

export async function getProperty({id}: {id: string}) {
    try {
        const result = await databases.getDocument(config.databaseId!, config.propertiesCollectionId!, id)
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}