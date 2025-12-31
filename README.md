# Beyond UI Blog

A modern blog application built with Next.js featuring articles.

This application displays featured posts and recent articles from [mock api](https://mockapi.io/), with a clean and responsive design.

## Features

- Responsive design that works on mobile, tablet, and desktop
- Featured posts section showcasing important articles
- Blog post detail pages with rich content
- Client-side data fetching with React Query

## Technologies Used

- **Frontend Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: React Query / TanStack Query
- **State Management**: React Hooks

---

## Mock API Data Structure

The application uses [mockapi.io](https://mockapi.io/) to generate blog data. Below is the schema used:

| Field           | Type          | Data (Faker.js)          |
|-----------------|--------------|--------------------------|
| **id**          | Object ID    | Generated automatically   |
| **createdAt**   | Date         | `date.recent`             |
| **title**       | String       | `lorem.words`             |
| **content**     | String       | `lorem.paragraphs`        |
| **image**       | String (URL) | `image.urlPicsumPhotos`   |
| **author**      | String       | `name.fullName`           |
| **date**        | Date         | `date.recent`             |
| **description** | String       | `lorem.paragraph`         |
| **featured**    | Boolean      | `datatype.boolean`        |
| **category**    | String       | `lorem.word`              |
| **authorAvatar**| String (URL) | `image.avatar`            |

### Example Mock API Response

```json
[
  {
    "id": "1",
    "createdAt": "2025-08-01T10:12:34.000Z",
    "title": "Designing Modern SaaS Interfaces",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    "image": "https://picsum.photos/800/400",
    "author": "Jane Doe",
    "date": "2025-07-30T15:45:12.000Z",
    "description": "Learn the best practices for designing SaaS products.",
    "featured": true,
    "category": "UI/UX",
    "authorAvatar": "https://i.pravatar.cc/150?img=3"
  }
]

```


## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AthulSabu2002/blog.git
   cd blog-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.
## API Integration

The application fetches blog data from a mock API. To configure your own API endpoint:

1. Create a `.env.local` file in the root directory
2. Add your API base URL: `NEXT_PUBLIC_API_URL=your_api_endpoint`
