import { facebookService } from '@/lib/facebook'

export default async function TestPage() {
  let testResult = 'Loading...'
  let posts: any[] = []
  
  try {
    // Test the token first
    const tokenValid = await facebookService.testToken()
    console.log('Token valid:', tokenValid)
    
    if (tokenValid) {
      posts = await facebookService.getPosts(3)
      testResult = `Token is valid. Found ${posts.length} posts.`
    } else {
      testResult = 'Token is invalid.'
    }
  } catch (error) {
    testResult = `Error: ${error}`
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Facebook API Test</h1>
      <div className="bg-gray-100 p-4 rounded">
        <p><strong>Test Result:</strong> {testResult}</p>
      </div>
      
      {posts.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Posts:</h2>
          {posts.map((post, idx) => (
            <div key={idx} className="border p-4 mb-4 rounded">
              <p><strong>ID:</strong> {post.id}</p>
              <p><strong>Message:</strong> {post.message || 'No message'}</p>
              <p><strong>Created:</strong> {post.created_time}</p>
              <p><strong>Link:</strong> <a href={post.permalink_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">View on Facebook</a></p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
