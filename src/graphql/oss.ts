import { gql } from '@apollo/client'

export const GET_OSS_INFO = gql`
    query getOSSInfo {
        getOSSInfo {
            expire
            policy
            signature
            accessId
        }
    }
`
